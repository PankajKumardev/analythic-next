import { NextRequest, NextResponse } from 'next/server';
import { connectToMongoDB } from '@/lib/mongo';
import { EventModel } from '@/models/Event';

// Debug endpoint to check MongoDB
export async function GET(req: NextRequest) {
  try {
    // Test MongoDB connection
    await connectToMongoDB();
    
    // Count all events
    const totalEvents = await EventModel.countDocuments();
    
    // Get recent events
    const recentEvents = await EventModel.find()
      .sort({ timestamp: -1 })
      .limit(10)
      .lean();

    return NextResponse.json({
      success: true,
      mongoConnected: true,
      totalEvents,
      recentEvents: recentEvents.map(e => ({
        projectId: e.projectId,
        name: e.name,
        url: e.properties?.url,
        timestamp: e.timestamp,
        country: e.geo?.country
      }))
    });

  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json({
      success: false,
      error: (error as Error).message
    }, { status: 500 });
  }
}
