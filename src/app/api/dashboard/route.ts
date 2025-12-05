import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { connectToMongoDB } from '@/lib/mongo';
import { EventModel } from '@/models/Event';
import { verify } from 'jsonwebtoken';

// Dashboard API - reads directly from MongoDB for real-time data
async function getUserFromToken(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  const token = authHeader.split(' ')[1];
  try {
    const decoded = verify(token, process.env.NEXTAUTH_SECRET || 'secret') as { id: string };
    return decoded;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromToken(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const days = parseInt(searchParams.get('days') || '7');

    // Get user's projects from PostgreSQL
    const userOrgs = await prisma.userOrganization.findMany({
      where: { userId: user.id },
      include: {
        org: {
          include: { projects: true }
        }
      }
    });

    if (userOrgs.length === 0) {
      return NextResponse.json({
        projects: [],
        stats: null,
        message: 'No projects found'
      });
    }

    const projects = userOrgs.flatMap(uo => uo.org.projects);
    
    if (projects.length === 0) {
      return NextResponse.json({
        projects: [],
        stats: null,
        message: 'No projects found'
      });
    }

    // Get writeKeys for MongoDB query
    const writeKeys = projects.map(p => p.writeKey);

    // Calculate date range
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    // Query MongoDB directly for events
    await connectToMongoDB();
    
    const events = await EventModel.find({
      projectId: { $in: writeKeys },
      timestamp: { $gte: startDate }
    }).lean();

    // Aggregate data from MongoDB events
    const aggregated = {
      totalPageViews: 0,
      totalVisitors: 0,
      topPages: {} as Record<string, number>,
      topCountries: {} as Record<string, number>,
      topBrowsers: {} as Record<string, number>,
      screens: {} as Record<string, number>,
      dailyData: new Map<string, { pageViews: number; visitors: number }>()
    };

    // Track unique visitors per day (by simple count for now)
    const visitorsByDay = new Map<string, Set<string>>();

    events.forEach(event => {
      const dateStr = new Date(event.timestamp).toISOString().split('T')[0];
      
      // Count pageviews
      if (event.name === 'pageview') {
        aggregated.totalPageViews++;
        
        // Pages
        const url = (event.properties?.url as string) || '/';
        aggregated.topPages[url] = (aggregated.topPages[url] || 0) + 1;
      }

      // Countries (count as visitors)
      const country = (event.geo?.country as string) || 'Unknown';
      aggregated.topCountries[country] = (aggregated.topCountries[country] || 0) + 1;

      // Browsers
      const browser = (event.properties?.userAgent as string) || 'Other';
      aggregated.topBrowsers[browser] = (aggregated.topBrowsers[browser] || 0) + 1;

      // Screens
      const screen = (event.properties?.screen as string) || 'Unknown';
      aggregated.screens[screen] = (aggregated.screens[screen] || 0) + 1;

      // Daily aggregation
      if (!aggregated.dailyData.has(dateStr)) {
        aggregated.dailyData.set(dateStr, { pageViews: 0, visitors: 0 });
      }
      const dayData = aggregated.dailyData.get(dateStr)!;
      if (event.name === 'pageview') {
        dayData.pageViews++;
      }
      
      // Track visitors by eventId or simple increment
      if (!visitorsByDay.has(dateStr)) {
        visitorsByDay.set(dateStr, new Set());
      }
      visitorsByDay.get(dateStr)!.add(event.eventId || String(Math.random()));
    });

    // Calculate total visitors
    aggregated.totalVisitors = Object.values(
      Object.fromEntries(visitorsByDay)
    ).reduce((sum, set) => sum + set.size, 0);

    // Update daily visitor counts
    visitorsByDay.forEach((visitors, date) => {
      const dayData = aggregated.dailyData.get(date);
      if (dayData) {
        dayData.visitors = visitors.size;
      }
    });

    // Format top lists
    const formatTopList = (obj: Record<string, number>, limit = 5) => {
      return Object.entries(obj)
        .sort(([, a], [, b]) => b - a)
        .slice(0, limit)
        .map(([name, count]) => ({ name, count }));
    };

    // Calculate device percentages
    const devices = calculateDevices(aggregated.screens);

    // Convert daily map to sorted array
    const dailyData = Array.from(aggregated.dailyData.entries())
      .map(([date, data]) => ({ date, ...data }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return NextResponse.json({
      projects: projects.map(p => ({
        id: p.id,
        name: p.name,
        domain: p.domain,
        writeKey: p.writeKey
      })),
      stats: {
        timeRange: { from: startDate.toISOString(), to: new Date().toISOString(), days },
        summary: {
          totalPageViews: aggregated.totalPageViews,
          totalVisitors: aggregated.totalVisitors
        },
        dailyData,
        topPages: formatTopList(aggregated.topPages),
        topCountries: formatTopList(aggregated.topCountries, 10),
        topBrowsers: formatTopList(aggregated.topBrowsers),
        devices
      }
    });

  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}

// Helper to categorize screen sizes into devices
function calculateDevices(screens: Record<string, number>) {
  let desktop = 0;
  let mobile = 0;
  let tablet = 0;

  Object.entries(screens).forEach(([screen, count]) => {
    const width = parseInt(screen.split('x')[0]) || 0;
    if (width >= 1024) {
      desktop += count;
    } else if (width >= 768) {
      tablet += count;
    } else {
      mobile += count;
    }
  });

  const total = desktop + mobile + tablet || 1;
  return {
    desktop: Math.round((desktop / total) * 100),
    mobile: Math.round((mobile / total) * 100),
    tablet: Math.round((tablet / total) * 100)
  };
}
