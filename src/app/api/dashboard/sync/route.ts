import { NextRequest, NextResponse } from 'next/server';
import { connectToMongoDB } from '@/lib/mongo';
import { EventModel } from '@/models/Event';
import { prisma } from '@/lib/prisma';
import { verify } from 'jsonwebtoken';

// Manual aggregation - aggregates today's events for testing
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

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromToken(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's projects
    const userOrg = await prisma.userOrganization.findFirst({
      where: { userId: user.id },
      include: {
        org: {
          include: { projects: true }
        }
      }
    });

    if (!userOrg || userOrg.org.projects.length === 0) {
      return NextResponse.json({ error: 'No projects found' }, { status: 400 });
    }

    const projectWriteKeys = userOrg.org.projects.map(p => p.writeKey);

    // Get today's date range
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    console.log(`Aggregating events from ${today.toISOString()} to ${tomorrow.toISOString()}`);
    console.log(`Looking for writeKeys: ${projectWriteKeys.join(', ')}`);

    // Fetch today's events from MongoDB
    await connectToMongoDB();
    const events = await EventModel.find({
      projectId: { $in: projectWriteKeys },
      timestamp: {
        $gte: today,
        $lt: tomorrow
      }
    }).lean();

    console.log(`Found ${events.length} events to aggregate`);

    if (events.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No events to aggregate today',
        processed: 0
      });
    }

    // Group events by projectId (writeKey)
    const grouped = events.reduce((acc: Record<string, typeof events>, event) => {
      const projectId = event.projectId as string;
      if (!acc[projectId]) {
        acc[projectId] = [];
      }
      acc[projectId].push(event);
      return acc;
    }, {});

    let projectsProcessed = 0;

    for (const [writeKey, projectEvents] of Object.entries(grouped)) {
      // Find the actual project by writeKey
      const project = userOrg.org.projects.find(p => p.writeKey === writeKey);
      if (!project) continue;

      // Initialize counters
      const pageViews: Record<string, number> = {};
      const countries: Record<string, number> = {};
      const browsers: Record<string, number> = {};
      const screens: Record<string, number> = {};
      const referrers: Record<string, number> = {};

      // Count occurrences
      projectEvents.forEach((event) => {
        // Page views
        const url = (event.properties?.url as string) || '/';
        pageViews[url] = (pageViews[url] || 0) + 1;

        // Countries
        const country = (event.geo?.country as string) || 'Unknown';
        countries[country] = (countries[country] || 0) + 1;

        // Browsers
        const browser = (event.properties?.userAgent as string) || 'Other';
        browsers[browser] = (browsers[browser] || 0) + 1;

        // Screens
        const screen = (event.properties?.screen as string) || 'Unknown';
        screens[screen] = (screens[screen] || 0) + 1;

        // Referrers
        const referrer = (event.properties?.referrer as string) || 'Direct';
        referrers[referrer] = (referrers[referrer] || 0) + 1;
      });

      // Upsert into Postgres using actual project ID
      await prisma.dailyStat.upsert({
        where: {
          projectId_date: {
            projectId: project.id,
            date: today
          }
        },
        create: {
          projectId: project.id,
          date: today,
          pageViews,
          countries,
          browsers,
          screens,
          referrers,
          aggregated: true
        },
        update: {
          pageViews,
          countries,
          browsers,
          screens,
          referrers,
          aggregated: true
        }
      });

      projectsProcessed++;
    }

    return NextResponse.json({
      success: true,
      message: 'Events aggregated successfully',
      eventsProcessed: events.length,
      projectsProcessed,
      date: today.toISOString()
    });

  } catch (error) {
    console.error('Manual aggregation failed:', error);
    return NextResponse.json(
      { error: 'Aggregation failed', details: (error as Error).message },
      { status: 500 }
    );
  }
}
