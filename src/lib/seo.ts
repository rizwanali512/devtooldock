import type { Metadata } from 'next';

/**
 * The single canonical origin for the site. Every canonical URL, sitemap entry,
 * and metadataBase MUST resolve to this exact host (https + www, no trailing
 * slash). Hardcoding it here guarantees correct canonicals even if an
 * environment variable is missing on a deploy, which is what causes the GSC
 * "Duplicate / different canonical" and "Page with redirect" issues.
 */
export const BASE_URL = 'https://www.devtooldock.com';

/**
 * Default SEO keywords for DevToolDock.
 * Used in root layout and can be extended per page.
 */
export const DEFAULT_KEYWORDS =
  'developer tools, AI tools, JSON formatter, Base64 encoder, regex tester, dev utilities, online developer tools';

/**
 * Build an absolute, canonical URL for a given path.
 *
 * Returns an `https://www.devtooldock.com` URL with no trailing slash (the root
 * "/" collapses to the bare origin). The trailing slash is intentionally
 * stripped because `middleware.ts` 308-redirects `/path/` -> `/path`; a
 * canonical that still carried the slash would point at a URL that immediately
 * redirects, which defeats the purpose of the canonical tag.
 *
 * @example getCanonicalUrl('/ai/code-refactor') // https://www.devtooldock.com/ai/code-refactor
 * @example getCanonicalUrl('categories')        // https://www.devtooldock.com/categories
 * @example getCanonicalUrl('/')                 // https://www.devtooldock.com
 */
export function getCanonicalUrl(path = '/'): string {
  const cleanPath = (path.startsWith('/') ? path : `/${path}`)
    .split(/[?#]/)[0]!
    .replace(/\/{2,}/g, '/')
    .replace(/\/+$/, '');
  return cleanPath === '' ? BASE_URL : `${BASE_URL}${cleanPath}`;
}

/**
 * Backwards-compatible alias for {@link getCanonicalUrl}.
 */
export const canonical = getCanonicalUrl;

/**
 * Build a Metadata object pre-populated with a self-referential canonical for
 * `path`. Spread your page-specific fields via `overrides`.
 *
 * @example
 * export const metadata = generatePageMetadata('/categories', {
 *   title: 'Developer Tools Categories',
 *   description: '...',
 * });
 */
export function generatePageMetadata(
  path: string,
  overrides: Metadata = {}
): Metadata {
  return {
    alternates: {
      canonical: getCanonicalUrl(path),
    },
    ...overrides,
  };
}
