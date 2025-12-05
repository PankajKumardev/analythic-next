import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verify } from 'jsonwebtoken';

// Test endpoint to seed sample analytics data
// This helps verify the dashboard works before real tracking is set up

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

    // Get user's first project
    const userOrg = await prisma.userOrganization.findFirst({
      where: { userId: user.id },
      include: {
        org: {
          include: { projects: true }
        }
      }
    });

    if (!userOrg || userOrg.org.projects.length === 0) {
      return NextResponse.json({ error: 'No project found. Create a project first.' }, { status: 400 });
    }

    const project = userOrg.org.projects[0];

    // Generate sample data for the last 7 days
    const now = new Date();
    const sampleData = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      // Random but realistic data
      const baseViews = Math.floor(Math.random() * 500) + 100;
      const homeViews = Math.floor(baseViews * 0.4);
      const pricingViews = Math.floor(baseViews * 0.25);
      const featuresViews = Math.floor(baseViews * 0.2);
      const blogViews = Math.floor(baseViews * 0.15);

      const usVisitors = Math.floor(baseViews * 0.35);
      const inVisitors = Math.floor(baseViews * 0.25);
      const ukVisitors = Math.floor(baseViews * 0.15);
      const deVisitors = Math.floor(baseViews * 0.1);
      const caVisitors = Math.floor(baseViews * 0.1);
      const otherVisitors = baseViews - usVisitors - inVisitors - ukVisitors - deVisitors - caVisitors;

      sampleData.push({
        projectId: project.id,
        date,
        pageViews: {
          '/': homeViews,
          '/pricing': pricingViews,
          '/features': featuresViews,
          '/blog': blogViews
        },
        countries: {
          'US': usVisitors,
          'IN': inVisitors,
          'UK': ukVisitors,
          'DE': deVisitors,
          'CA': caVisitors,
          'FR': otherVisitors
        },
        browsers: {
          'Chrome': Math.floor(baseViews * 0.6),
          'Safari': Math.floor(baseViews * 0.2),
          'Firefox': Math.floor(baseViews * 0.1),
          'Edge': Math.floor(baseViews * 0.1)
        },
        screens: {
          '1920x1080': Math.floor(baseViews * 0.4),
          '1366x768': Math.floor(baseViews * 0.2),
          '390x844': Math.floor(baseViews * 0.25),
          '768x1024': Math.floor(baseViews * 0.1),
          '414x896': Math.floor(baseViews * 0.05)
        },
        referrers: {
          'google.com': Math.floor(baseViews * 0.4),
          'direct': Math.floor(baseViews * 0.3),
          'twitter.com': Math.floor(baseViews * 0.15),
          'github.com': Math.floor(baseViews * 0.15)
        },
        aggregated: true
      });
    }

    // Delete existing sample data for this project (if re-running)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    await prisma.dailyStat.deleteMany({
      where: {
        projectId: project.id,
        date: { gte: sevenDaysAgo }
      }
    });

    // Insert sample data
    await prisma.dailyStat.createMany({
      data: sampleData
    });

    return NextResponse.json({
      success: true,
      message: 'Sample data created for last 7 days',
      project: project.name,
      recordsCreated: sampleData.length
    });

  } catch (error) {
    console.error('Seed data error:', error);
    return NextResponse.json({ error: 'Failed to seed data' }, { status: 500 });
  }
}
