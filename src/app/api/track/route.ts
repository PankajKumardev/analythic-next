import { NextRequest, NextResponse } from 'next/server';
import { connectToMongoDB } from '@/lib/mongo';
import { EventModel } from '@/models/Event';
import { checkLimitAndIncrement } from '@/lib/limits';
import { getGeoFromRequest, getBrowserFromUA } from '@/lib/geo';

// 🚨 CRITICAL: Use Node runtime, NOT Edge
// Edge runtime can't maintain MongoDB TCP connections reliably
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    // 1. Parse request body
    const body = await req.json();
    const { key, name, url, referrer, screen, language, eventId } = body;

    // 2. Validate required fields
    if (!key || !name || !url) {
      return NextResponse.json(
        { error: 'Missing required fields: key, name, url' },
        { status: 400 }
      );
    }

    // 3. Rate limit check (Atomic Postgres update)
    // Uses writeKey instead of secretKey
    const allowed = await checkLimitAndIncrement(key);
    if (!allowed) {
      return NextResponse.json(
        { error: 'Monthly limit exceeded. Please upgrade your plan.' },
        { status: 429 }
      );
    }

    // 4. Extract geo data (Free with Vercel headers)
    const geo = getGeoFromRequest(req);

    // 5. Get user agent
    const userAgent = req.headers.get('user-agent') || '';
    const browser = getBrowserFromUA(userAgent);

    // 6. Connect to MongoDB and save event
    await connectToMongoDB();
    
    try {
      await EventModel.create({
        projectId: key, // This is the writeKey
        eventId: eventId || `${key}-${Date.now()}-${Math.random()}`, // Deduplication
        name,
        properties: {
          url,
          referrer: referrer || undefined,
          screen: screen || undefined,
          language: language || undefined,
          userAgent: browser
        },
        geo,
        timestamp: new Date()
      });
    } catch (error: unknown) {
      // Duplicate event - silently ignore (deduplication working)
      if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
        return new NextResponse(null, { status: 204 });
      }
      throw error;
    }

    // 7. Return success (1x1 transparent pixel for <img> tracking)
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'no-store, no-cache, must-revalidate'
      }
    });

  } catch (error) {
    console.error('Tracking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
