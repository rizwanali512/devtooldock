/**
 * Static high-traffic tools for internal linking & “Popular tools” sections.
 * Keep small to avoid excessive sitewide links; extend as needed.
 */
export const CORE_POPULAR_SLUGS = [
  'json-formatter',
  'base64-encoder',
  'regex-tester',
  'jwt-decoder',
] as const;

/** Extended list for homepage / blog sidebars (still capped in UI). */
export const POPULAR_TOOL_SLUGS = [
  ...CORE_POPULAR_SLUGS,
  'json-validator',
  'json-minifier',
  'json-pretty-print',
  'regex-explainer',
  'base64-decoder',
  'url-encoder',
  'url-decoder',
  'uuid-generator',
  'uuid-validator',
  'jwt-generator',
  'sha256-generator',
  'md5-generator',
  'password-generator',
  'query-string-parser',
  'http-header-parser',
  'html-minifier',
  'js-minifier',
] as const;
