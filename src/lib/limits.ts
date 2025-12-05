import { prisma } from './prisma';

/**
 * Atomic rate limit check and increment
 * Returns true if request is allowed, false if limit exceeded
 * 
 * Uses writeKey for security
 */
export async function checkLimitAndIncrement(writeKey: string): Promise<boolean> {
  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    // Get project and its organization
    const project = await prisma.project.findUnique({
      where: { writeKey },
      select: { 
        id: true,
        orgId: true,
        org: {
          select: {
            id: true,
            planTier: true,
            monthlyLimit: true,
            currentUsage: true
          }
        }
      }
    });

    if (!project) {
      console.error('Invalid write key:', writeKey.substring(0, 8) + '...');
      return false;
    }

    // ATOMIC SQL: Update count IF under limit OR new month
    const result = await prisma.$executeRaw`
      UPDATE "Organization"
      SET 
        "currentUsage" = CASE 
          WHEN "lastReset" < ${startOfMonth} THEN 1 
          ELSE "currentUsage" + 1 
        END,
        "lastReset" = CASE 
          WHEN "lastReset" < ${startOfMonth} THEN ${startOfMonth} 
          ELSE "lastReset" 
        END
      WHERE 
        "id" = ${project.orgId} 
        AND (
          ("lastReset" < ${startOfMonth}) 
          OR 
          ("currentUsage" < "monthlyLimit")
        )
    `;

    return result === 1;
  } catch (error) {
    console.error('Rate limit check failed:', error);
    return false; // Fail closed
  }
}

/**
 * Get current usage for an organization
 */
export async function getUsageStats(orgId: string) {
  const org = await prisma.organization.findUnique({
    where: { id: orgId },
    select: {
      currentUsage: true,
      monthlyLimit: true,
      lastReset: true,
      planTier: true
    }
  });

  if (!org) return null;

  const percentUsed = (org.currentUsage / org.monthlyLimit) * 100;

  return {
    used: org.currentUsage,
    limit: org.monthlyLimit,
    remaining: org.monthlyLimit - org.currentUsage,
    percentUsed: Math.round(percentUsed),
    plan: org.planTier,
    resetDate: org.lastReset
  };
}
