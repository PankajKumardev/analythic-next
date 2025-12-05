import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET all organizations for the current user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as { id: string }).id;

    const organizations = await prisma.userOrganization.findMany({
      where: { userId },
      include: {
        org: {
          include: {
            projects: true,
            _count: {
              select: { projects: true }
            }
          }
        }
      }
    });

    return NextResponse.json({
      organizations: organizations.map((uo: {
        org: {
          id: string;
          name: string;
          slug: string;
          planTier: string;
          projects: Array<{ id: string; name: string; domain: string | null }>;
          _count: { projects: number };
        };
        role: string;
      }) => ({
        id: uo.org.id,
        name: uo.org.name,
        slug: uo.org.slug,
        role: uo.role,
        planTier: uo.org.planTier,
        projectCount: uo.org._count.projects,
        projects: uo.org.projects.map((p: { id: string; name: string; domain: string | null }) => ({
          id: p.id,
          name: p.name,
          domain: p.domain
        }))
      }))
    });
  } catch (error) {
    console.error('Failed to fetch organizations:', error);
    return NextResponse.json({ error: 'Failed to fetch organizations' }, { status: 500 });
  }
}

// POST create new organization
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as { id: string }).id;
    const { name, slug } = await req.json();

    if (!name || !slug) {
      return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 });
    }

    // Check if slug is already taken
    const existing = await prisma.organization.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: 'Slug already taken' }, { status: 400 });
    }

    // Create organization and add user as owner
    const org = await prisma.organization.create({
      data: {
        name,
        slug,
        users: {
          create: {
            userId,
            role: 'OWNER'
          }
        }
      }
    });

    return NextResponse.json({ organization: org }, { status: 201 });
  } catch (error) {
    console.error('Failed to create organization:', error);
    return NextResponse.json({ error: 'Failed to create organization' }, { status: 500 });
  }
}
