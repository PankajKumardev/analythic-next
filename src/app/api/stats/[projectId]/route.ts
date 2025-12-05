import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    // 1. Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 2. Await params (Next.js 15 breaking change)
    const { projectId } = await params;
    
    const { searchParams } = new URL(req.url);
    const days = parseInt(searchParams.get('days') || '30');

    // 3. Verify user has access to this project
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        org: {
          users: {
            some: {
              userId: (session.user as { id: string }).id
            }
          }
        }
      }
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found or access denied' },
        { status: 404 }
      );
    }

    // 4. Calculate date range
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    // 5. Fetch daily stats
    const stats = await prisma.dailyStat.findMany({
      where: {
        projectId: project.id,
        date: { gte: startDate }
      },
      orderBy: { date: 'asc' }
    });

    // 6. Aggregate totals
    const totals = {
      totalPageViews: 0,
      uniquePages: new Set<string>(),
      topCountries: {} as Record<string, number>,
      topBrowsers: {} as Record<string, number>,
      topReferrers: {} as Record<string, number>
    };

    stats.forEach(stat => {
      // Page views
      const pageViews = stat.pageViews as Record<string, number>;
      Object.keys(pageViews).forEach(page => {
        totals.totalPageViews += pageViews[page];
        totals.uniquePages.add(page);
      });

      // Countries
      const countries = stat.countries as Record<string, number>;
      Object.entries(countries).forEach(([country, count]) => {
        totals.topCountries[country] = (totals.topCountries[country] || 0) + count;
      });

      // Browsers
      const browsers = stat.browsers as Record<string, number>;
      Object.entries(browsers).forEach(([browser, count]) => {
        totals.topBrowsers[browser] = (totals.topBrowsers[browser] || 0) + count;
      });

      // Referrers
      const referrers = stat.referrers as Record<string, number>;
      Object.entries(referrers).forEach(([referrer, count]) => {
        totals.topReferrers[referrer] = (totals.topReferrers[referrer] || 0) + count;
      });
    });

    // 7. Sort and format
    const topCountries = Object.entries(totals.topCountries)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([country, count]) => ({ country, count }));

    const topBrowsers = Object.entries(totals.topBrowsers)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([browser, count]) => ({ browser, count }));

    const topReferrers = Object.entries(totals.topReferrers)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([referrer, count]) => ({ referrer, count }));

    return NextResponse.json({
      timeRange: {
        from: startDate.toISOString(),
        to: new Date().toISOString(),
        days
      },
      summary: {
        totalPageViews: totals.totalPageViews,
        uniquePages: totals.uniquePages.size
      },
      dailyStats: stats.map(s => ({
        date: s.date.toISOString().split('T')[0],
        pageViews: Object.values(s.pageViews as Record<string, number>)
          .reduce((a, b) => a + b, 0)
      })),
      topCountries,
      topBrowsers,
      topReferrers
    });

  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
