import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * Enforce a single canonical host:
 * devtooldock.com -> www.devtooldock.com
 *
 * This helps avoid duplicate indexing across hosts and prevents SEO dilution.
 */
export function middleware(req: NextRequest) {
  const host = req.headers.get('host');
  if (!host) return NextResponse.next();

  // Skip local dev / preview hosts
  if (host.includes('localhost') || host.startsWith('127.0.0.1')) {
    return NextResponse.next();
  }

  // Only redirect the apex domain to www
  if (host === 'devtooldock.com') {
    const url = req.nextUrl.clone();
    url.host = 'www.devtooldock.com';
    url.protocol = 'https:';
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  // Avoid redirecting Next.js internals and static assets.
  matcher: ['/((?!_next|.*\\..*).*)'],
};

