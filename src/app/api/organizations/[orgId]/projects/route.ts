import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET all projects for an organization
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orgId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { orgId } = await params;
    const userId = (session.user as { id: string }).id;

    // Verify user belongs to this organization
    const membership = await prisma.userOrganization.findUnique({
      where: {
        userId_orgId: { userId, orgId }
      }
    });

    if (!membership) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const projects = await prisma.project.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      projects: projects.map(p => ({
        id: p.id,
        name: p.name,
        domain: p.domain,
        writeKey: p.writeKey, // Only show to authorized users
        createdAt: p.createdAt
      }))
    });
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

// POST create new project
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ orgId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { orgId } = await params;
    const userId = (session.user as { id: string }).id;

    // Verify user belongs to this organization and has permission
    const membership = await prisma.userOrganization.findUnique({
      where: {
        userId_orgId: { userId, orgId }
      }
    });

    if (!membership || membership.role === 'MEMBER') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const { name, domain } = await req.json();

    if (!name) {
      return NextResponse.json({ error: 'Project name is required' }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        name,
        domain: domain || null,
        orgId
      }
    });

    return NextResponse.json({ 
      project: {
        id: project.id,
        name: project.name,
        domain: project.domain,
        writeKey: project.writeKey,
        createdAt: project.createdAt
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to create project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
