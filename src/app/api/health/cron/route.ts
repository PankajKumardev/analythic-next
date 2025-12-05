import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Check if aggregation has run recently (within 6 hours)
    const sixHoursAgo = new Date();
    sixHoursAgo.setHours(sixHoursAgo.getHours() - 6);

    const recentStats = await prisma.dailyStat.findFirst({
      where: {
        aggregated: true
      },
      orderBy: {
        date: 'desc'
      }
    });

    const hasRecentAggregation = recentStats && recentStats.date >= sixHoursAgo;

    // Check database connections
    await prisma.$queryRaw`SELECT 1`;

    if (!hasRecentAggregation) {
      return NextResponse.json(
        { 
          status: 'warning',
          message: 'No recent aggregation detected. Cron job may have failed.',
          lastAggregation: recentStats?.date || null
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      status: 'healthy',
      message: 'All systems operational',
      lastAggregation: recentStats?.date
    });

  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Health check failed',
        error: (error as Error).message
      },
      { status: 500 }
    );
  }
}
