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
  if (
    host.includes('localhost') ||
    host.startsWith('127.0.0.1') ||
    host.endsWith('.vercel.app')
  ) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();

  // Enforce HTTPS (helps prevent http/https duplicates)
  const proto = req.headers.get('x-forwarded-proto');
  // Some platforms may not set x-forwarded-proto consistently; fall back to nextUrl.protocol.
  if (proto === 'http' || url.protocol === 'http:') {
    url.protocol = 'https:';
    return NextResponse.redirect(url, 308);
  }

  // Enforce canonical host: apex -> www
  if (host === 'devtooldock.com') {
    url.host = 'www.devtooldock.com';
    url.protocol = 'https:';
    return NextResponse.redirect(url, 308);
  }

  // Enforce no trailing slash (helps prevent /path vs /path/ duplicates)
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.replace(/\/+$/, '');
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  // Avoid redirecting Next.js internals and static assets.
  matcher: ['/((?!_next|.*\\..*).*)'],
};

