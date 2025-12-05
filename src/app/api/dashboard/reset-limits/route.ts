import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verify } from 'jsonwebtoken';

// Reset rate limits for testing
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

    // Get user's organization
    const userOrg = await prisma.userOrganization.findFirst({
      where: { userId: user.id },
      include: { org: true }
    });

    if (!userOrg) {
      return NextResponse.json({ error: 'No organization found' }, { status: 400 });
    }

    // Reset usage and increase limit for testing
    await prisma.organization.update({
      where: { id: userOrg.org.id },
      data: {
        currentUsage: 0,
        monthlyLimit: 100000, // 100k for testing
        lastReset: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Rate limits reset',
      newLimit: 100000,
      currentUsage: 0
    });

  } catch (error) {
    console.error('Reset limits error:', error);
    return NextResponse.json({ error: 'Failed to reset limits' }, { status: 500 });
  }
}
