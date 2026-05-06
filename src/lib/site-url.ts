/**
 * Canonical base URL for the site. Prefer NEXT_PUBLIC_SITE_URL, then NEXT_PUBLIC_APP_URL, then VERCEL_URL.
 */
export function getBaseUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);
  if (url) {
    const trimmed = url.trim().replace(/\/$/, '');
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
  return 'http://localhost:3000';
}
