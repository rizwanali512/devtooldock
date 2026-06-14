import { BASE_URL } from '@/lib/seo';

/**
 * Canonical base URL for the site, used for SEO metadata (canonical tags,
 * OpenGraph URLs, JSON-LD, sitemap).
 *
 * Resolution order:
 *  1. An explicit `NEXT_PUBLIC_SITE_URL` / `NEXT_PUBLIC_APP_URL` (normalized to
 *     https + www so it always matches the canonical host).
 *  2. In local development, `http://localhost:3000`.
 *  3. Otherwise the hardcoded canonical {@link BASE_URL}. We deliberately do NOT
 *     fall back to `VERCEL_URL` (a per-deployment `*.vercel.app` host), because
 *     that would emit non-canonical canonical tags and cause the GSC
 *     "Duplicate / Page with redirect" issues.
 */
export function getBaseUrl(): string {
  const explicit =
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_APP_URL;
  if (explicit) {
    const trimmed = explicit.trim().replace(/\/$/, '');
    try {
      const u = new URL(trimmed);
      // Normalize canonical host + protocol to avoid GSC "alternate page" issues
      if (u.protocol !== 'https:') u.protocol = 'https:';
      if (u.hostname === 'devtooldock.com') u.hostname = 'www.devtooldock.com';
      return u.toString().replace(/\/$/, '');
    } catch {
      return trimmed;
    }
  }
  if (process.env.NODE_ENV !== 'production') {
    return 'http://localhost:3000';
  }
  return BASE_URL;
}
