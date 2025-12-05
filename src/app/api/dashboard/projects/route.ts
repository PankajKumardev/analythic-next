import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verify } from 'jsonwebtoken';

// Helper to get user from JWT token
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

// GET - List all projects
export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromToken(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's organizations and projects
    const userOrgs = await prisma.userOrganization.findMany({
      where: { userId: user.id },
      include: {
        org: {
          include: {
            projects: {
              include: {
                dailyStats: {
                  where: {
                    date: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
                  }
                }
              }
            }
          }
        }
      }
    });

    const projects = userOrgs.flatMap(uo => 
      uo.org.projects.map(project => {
        // Calculate stats for last 7 days
        let totalViews = 0;
        let totalVisitors = 0;

        project.dailyStats.forEach(stat => {
          const pageViews = stat.pageViews as Record<string, number>;
          totalViews += Object.values(pageViews).reduce((a, b) => a + b, 0);
          
          const countries = stat.countries as Record<string, number>;
          totalVisitors += Object.values(countries).reduce((a, b) => a + b, 0);
        });

        return {
          id: project.id,
          name: project.name,
          domain: project.domain,
          writeKey: project.writeKey,
          orgId: uo.org.id,
          orgName: uo.org.name,
          stats: {
            views: totalViews,
            visitors: totalVisitors,
            change: 0 // Would need historical comparison
          },
          createdAt: project.createdAt
        };
      })
    );

    return NextResponse.json({ projects });

  } catch (error) {
    console.error('Projects API error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

// POST - Create new project
export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromToken(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, domain } = body;

    if (!name) {
      return NextResponse.json({ error: 'Project name is required' }, { status: 400 });
    }

    // Get user's first organization (or create one)
    let userOrg = await prisma.userOrganization.findFirst({
      where: { userId: user.id },
      include: { org: true }
    });

    if (!userOrg) {
      // Create default organization for new user
      const org = await prisma.organization.create({
        data: {
          name: 'My Organization',
          slug: `org-${user.id.substring(0, 8)}`,
          users: {
            create: {
              userId: user.id,
              role: 'OWNER'
            }
          }
        }
      });
      
      userOrg = await prisma.userOrganization.findFirst({
        where: { userId: user.id, orgId: org.id },
        include: { org: true }
      });
    }

    // Create project
    const project = await prisma.project.create({
      data: {
        name,
        domain: domain || null,
        orgId: userOrg!.org.id
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
    console.error('Create project error:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

// DELETE - Delete a project
export async function DELETE(req: NextRequest) {
  try {
    const user = await getUserFromToken(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('id');

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    // Verify user has access
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        org: {
          users: {
            some: { userId: user.id }
          }
        }
      }
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    await prisma.project.delete({
      where: { id: projectId }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Delete project error:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
