import { NextRequest, NextResponse } from 'next/server';
import { connectToMongoDB } from '@/lib/mongo';
import { EventModel } from '@/models/Event';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // 1. Verify cron secret (Security!)
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 2. Calculate yesterday's date range
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const today = new Date(yesterday);
    today.setDate(today.getDate() + 1);

    console.log(`Aggregating events for ${yesterday.toISOString()}`);

    // 3. Fetch all events from MongoDB for yesterday
    await connectToMongoDB();
    const events = await EventModel.find({
      timestamp: {
        $gte: yesterday,
        $lt: today
      }
    }).lean();

    console.log(`Found ${events.length} events to aggregate`);

    if (events.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No events to aggregate',
        processed: 0
      });
    }

    // 4. Group events by projectId
    const grouped = events.reduce((acc: Record<string, typeof events>, event) => {
      const projectId = event.projectId as string;
      if (!acc[projectId]) {
        acc[projectId] = [];
      }
      acc[projectId].push(event);
      return acc;
    }, {});

    // 5. Aggregate and save to Postgres
    let projectsProcessed = 0;

    for (const [projectId, projectEvents] of Object.entries(grouped)) {
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

      // 6. Upsert into Postgres
      await prisma.dailyStat.upsert({
        where: {
          projectId_date: {
            projectId,
            date: yesterday
          }
        },
        create: {
          projectId,
          date: yesterday,
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

    // 7. MongoDB will auto-delete these events due to TTL
    console.log(`✅ Aggregated ${projectsProcessed} projects`);

    return NextResponse.json({
      success: true,
      message: 'Events aggregated successfully',
      processed: events.length,
      projects: projectsProcessed,
      date: yesterday.toISOString()
    });

  } catch (error) {
    console.error('Aggregation failed:', error);
    return NextResponse.json(
      { error: 'Aggregation failed', details: (error as Error).message },
      { status: 500 }
    );
  }
}
