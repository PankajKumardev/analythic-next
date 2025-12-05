/**
 * Extract geo data from request headers
 * Vercel automatically provides these headers on Edge network
 */
export function getGeoFromRequest(req: Request): { country: string; city?: string } {
  // Vercel Edge headers (FREE, no API calls needed)
  const country = req.headers.get('x-vercel-ip-country') || 'Unknown';
  const city = req.headers.get('x-vercel-ip-city') || undefined;

  return { country, city };
}

/**
 * Fallback: Use free IP API for local development
 * Only use this if NOT on Vercel (costs 1 API call per event)
 */
export async function getGeoFromIP(ip: string): Promise<{ country: string; city?: string }> {
  try {
    // Free tier: 1000 requests/day
    // Get free key at: https://ipapi.co/
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();
    
    return {
      country: data.country_code || 'Unknown',
      city: data.city || undefined
    };
  } catch (error) {
    console.error('Geo lookup failed:', error);
    return { country: 'Unknown' };
  }
}

/**
 * Parse User-Agent to get browser name
 */
export function getBrowserFromUA(userAgent: string): string {
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Edge')) return 'Edge';
  return 'Other';
}
