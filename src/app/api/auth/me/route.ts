import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractTokenFromHeader, getUserFromToken } from '@/lib/jwt';

// GET current user from JWT token
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    const user = await getUserFromToken(token);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
      },
      organizations: user.organizations.map((uo: { org: { id: string; name: string; slug: string }; role: string }) => ({
        id: uo.org.id,
        name: uo.org.name,
        slug: uo.org.slug,
        role: uo.role
      }))
    });

  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Failed to get user' },
      { status: 500 }
    );
  }
}

// PUT update current user
export async function PUT(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    const currentUser = await getUserFromToken(token);
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    const { name, image } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        name: name !== undefined ? name : undefined,
        image: image !== undefined ? image : undefined,
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
      }
    });

    return NextResponse.json({
      message: 'User updated successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}
