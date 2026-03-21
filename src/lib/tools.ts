import { POPULAR_TOOL_SLUGS } from '@/lib/popularTools';

export type Tool = {
  name: string;
  slug: string;
  description: string;
  /** Canonical category slug (used in URLs and internal linking). */
  category: string;
  tags: string[];
};

const CATEGORY_TAG_SEEDS: Record<string, string[]> = {
  json: ['json', 'data', 'api', 'format'],
  encoding: ['encoding', 'base64', 'text'],
  security: ['security', 'jwt', 'hash', 'uuid', 'crypto'],
  text: ['text', 'regex', 'string'],
  'web-dev': ['web', 'css', 'javascript', 'html'],
  'file-converters': ['convert', 'file', 'csv', 'yaml', 'xml'],
  ai: ['ai', 'developer'],
  datetime: ['date', 'time', 'timestamp'],
  color: ['color', 'css', 'hex'],
  url: ['url', 'encode', 'query'],
  utilities: ['utilities', 'developer', 'reference'],
};

function buildTags(slug: string, category: string): string[] {
  const seeds = CATEGORY_TAG_SEEDS[category] ?? ['developer', 'tool'];
  const fromSlug = slug.split('-').filter((w) => w.length > 1);
  return [...new Set([...seeds, ...fromSlug])];
}

const RAW_TOOLS: Array<Omit<Tool, 'tags'>> = [
  // JSON Tools
  {
    name: 'JSON Formatter',
    slug: 'json-formatter',
    description: 'Format, validate, and beautify JSON with syntax highlighting.',
    category: 'json',
  },
  {
    name: 'JSON Validator',
    slug: 'json-validator',
    description: 'Validate JSON syntax and get clear error messages.',
    category: 'json',
  },
  {
    name: 'JSON to CSV',
    slug: 'json-to-csv',
    description: 'Convert JSON array to CSV format.',
    category: 'json',
  },
  {
    name: 'CSV to JSON',
    slug: 'csv-to-json',
    description: 'Convert CSV text to JSON array.',
    category: 'json',
  },
  {
    name: 'JSON to XML',
    slug: 'json-to-xml',
    description: 'Convert JSON to XML format.',
    category: 'json',
  },
  {
    name: 'JSON Minifier',
    slug: 'json-minifier',
    description: 'Minify JSON by removing whitespace and newlines.',
    category: 'json',
  },
  {
    name: 'JSON Pretty Print',
    slug: 'json-pretty-print',
    description: 'Format JSON with indentation for readability.',
    category: 'json',
  },

  // File Converters
  {
    name: 'XML to JSON',
    slug: 'xml-to-json',
    description: 'Convert XML into JSON format.',
    category: 'file-converters',
  },
  {
    name: 'JSON to YAML',
    slug: 'json-to-yaml',
    description: 'Convert JSON into YAML.',
    category: 'file-converters',
  },
  {
    name: 'YAML to JSON',
    slug: 'yaml-to-json',
    description: 'Convert YAML into JSON.',
    category: 'file-converters',
  },
  {
    name: 'CSV to TSV',
    slug: 'csv-to-tsv',
    description: 'Convert CSV into TSV.',
    category: 'file-converters',
  },
  {
    name: 'TSV to CSV',
    slug: 'tsv-to-csv',
    description: 'Convert TSV into CSV.',
    category: 'file-converters',
  },
  {
    name: 'Base64 to Image',
    slug: 'base64-to-image',
    description: 'Preview Base64 image data as an image.',
    category: 'file-converters',
  },
  {
    name: 'Image to Base64',
    slug: 'image-to-base64',
    description: 'Convert an image file to Base64 (data URL).',
    category: 'file-converters',
  },

  // Encoding Tools
  {
    name: 'Base64 Encoder',
    slug: 'base64-encoder',
    description: 'Encode text to Base64.',
    category: 'encoding',
  },
  {
    name: 'Base64 Decoder',
    slug: 'base64-decoder',
    description: 'Decode Base64 to text.',
    category: 'encoding',
  },
  {
    name: 'URL Encoder',
    slug: 'url-encoder',
    description: 'Encode text for use in URLs.',
    category: 'url',
  },
  {
    name: 'URL Decoder',
    slug: 'url-decoder',
    description: 'Decode URL-encoded text.',
    category: 'url',
  },
  {
    name: 'HTML Encoder',
    slug: 'html-encoder',
    description: 'Encode text to HTML entities.',
    category: 'encoding',
  },
  {
    name: 'HTML Decoder',
    slug: 'html-decoder',
    description: 'Decode HTML entities to text.',
    category: 'encoding',
  },

  // Security Tools
  {
    name: 'JWT Decoder',
    slug: 'jwt-decoder',
    description: 'Decode and inspect JWT header and payload.',
    category: 'security',
  },
  {
    name: 'UUID Generator',
    slug: 'uuid-generator',
    description: 'Generate UUID v4 identifiers.',
    category: 'security',
  },
  {
    name: 'UUID Validator',
    slug: 'uuid-validator',
    description: 'Validate UUID strings (v1–v5).',
    category: 'security',
  },
  {
    name: 'Password Generator',
    slug: 'password-generator',
    description: 'Generate secure random passwords.',
    category: 'security',
  },
  {
    name: 'SHA256 Generator',
    slug: 'sha256-generator',
    description: 'Compute SHA-256 hash of text.',
    category: 'security',
  },
  {
    name: 'MD5 Generator',
    slug: 'md5-generator',
    description: 'Compute MD5 hash of text.',
    category: 'security',
  },

  // Text Tools
  {
    name: 'Regex Tester',
    slug: 'regex-tester',
    description: 'Test regular expressions and highlight matches.',
    category: 'text',
  },
  {
    name: 'Regex Generator',
    slug: 'regex-generator',
    description: 'Generate regular expressions from common patterns.',
    category: 'text',
  },
  {
    name: 'Regex Explainer',
    slug: 'regex-explainer',
    description: 'Explain regular expressions in plain language.',
    category: 'text',
  },
  {
    name: 'Text Diff Checker',
    slug: 'text-diff-checker',
    description: 'Compare two texts and see differences.',
    category: 'text',
  },
  {
    name: 'Remove Duplicate Lines',
    slug: 'remove-duplicate-lines',
    description: 'Remove duplicate lines from text.',
    category: 'text',
  },
  {
    name: 'Sort Text Lines',
    slug: 'sort-text-lines',
    description: 'Sort lines of text alphabetically.',
    category: 'text',
  },
  {
    name: 'Word Counter',
    slug: 'word-counter',
    description: 'Count words, characters, and lines.',
    category: 'text',
  },
  {
    name: 'Case Converter',
    slug: 'case-converter',
    description: 'Convert text to camelCase, snake_case, kebab-case, and more.',
    category: 'text',
  },
  {
    name: 'Slug Generator',
    slug: 'slug-generator',
    description: 'Generate URL-friendly slugs from text.',
    category: 'text',
  },
  {
    name: 'Random String Generator',
    slug: 'random-string-generator',
    description: 'Generate random strings with configurable charset.',
    category: 'text',
  },
  {
    name: 'Lorem Ipsum Generator',
    slug: 'lorem-ipsum-generator',
    description: 'Generate placeholder lorem ipsum text.',
    category: 'text',
  },
  {
    name: 'JSON Diff Viewer',
    slug: 'json-diff-viewer',
    description: 'Compare two JSON objects and show differences.',
    category: 'text',
  },

  // Web Development Tools
  {
    name: 'CSS Minifier',
    slug: 'css-minifier',
    description: 'Minify CSS code.',
    category: 'web-dev',
  },
  {
    name: 'CSS Beautifier',
    slug: 'css-beautifier',
    description: 'Format and beautify CSS.',
    category: 'web-dev',
  },
  {
    name: 'JS Minifier',
    slug: 'js-minifier',
    description: 'Minify JavaScript code.',
    category: 'web-dev',
  },
  {
    name: 'HTML Minifier',
    slug: 'html-minifier',
    description: 'Minify HTML by removing comments and extra whitespace.',
    category: 'web-dev',
  },
  {
    name: 'JS Beautifier',
    slug: 'js-beautifier',
    description: 'Format and beautify JavaScript.',
    category: 'web-dev',
  },
  {
    name: 'Meta Tag Generator',
    slug: 'meta-tag-generator',
    description: 'Generate common SEO meta tags for a page.',
    category: 'web-dev',
  },
  {
    name: 'Robots.txt Generator',
    slug: 'robots-txt-generator',
    description: 'Generate a robots.txt file for your site.',
    category: 'web-dev',
  },

  // Developer Utilities (kept under Web Dev for now? No—map to Web Development Tools? The requested category list does not include Utilities.
  // We place them under Web Development Tools to keep the system limited to the requested categories.
  {
    name: 'Timestamp Converter',
    slug: 'timestamp-converter',
    description: 'Convert date/time ↔ timestamp.',
    category: 'datetime',
  },
  {
    name: 'Unix Timestamp Converter',
    slug: 'unix-timestamp-converter',
    description: 'Convert Unix timestamp seconds ↔ date/time.',
    category: 'datetime',
  },
  {
    name: 'Color Converter',
    slug: 'color-converter',
    description: 'Convert HEX ↔ RGB ↔ HSL.',
    category: 'color',
  },
  {
    name: 'URL Parser',
    slug: 'url-parser',
    description: 'Parse a URL into components and query params.',
    category: 'url',
  },
  {
    name: 'HTTP Header Parser',
    slug: 'http-header-parser',
    description: 'Parse raw HTTP headers into key/value pairs.',
    category: 'web-dev',
  },
  {
    name: 'Cron Expression Generator',
    slug: 'cron-expression-generator',
    description: 'Build a cron expression from common fields.',
    category: 'web-dev',
  },

  // AI Developer Tools (placeholder for future)
  // Date & Time Tools
  {
    name: 'Date Difference Calculator',
    slug: 'date-difference-calculator',
    description: 'Calculate the difference between two dates.',
    category: 'datetime',
  },
  {
    name: 'Timezone Converter',
    slug: 'timezone-converter',
    description: 'Convert a date/time between common timezones.',
    category: 'datetime',
  },
  {
    name: 'Date Format Converter',
    slug: 'date-format-converter',
    description: 'Convert dates between common formats.',
    category: 'datetime',
  },

  // Color Tools
  {
    name: 'HEX to RGB',
    slug: 'hex-to-rgb',
    description: 'Convert HEX colors to RGB.',
    category: 'color',
  },
  {
    name: 'RGB to HEX',
    slug: 'rgb-to-hex',
    description: 'Convert RGB colors to HEX.',
    category: 'color',
  },
  {
    name: 'Color Picker',
    slug: 'color-picker',
    description: 'Pick a color and copy values in multiple formats.',
    category: 'color',
  },
  {
    name: 'Gradient Generator',
    slug: 'gradient-generator',
    description: 'Generate CSS gradients and preview them.',
    category: 'color',
  },
  {
    name: 'CSS Shadow Generator',
    slug: 'css-shadow-generator',
    description: 'Generate CSS box-shadow values with preview.',
    category: 'color',
  },

  // URL Tools
  {
    name: 'Query String Parser',
    slug: 'query-string-parser',
    description: 'Parse query strings into key/value pairs.',
    category: 'url',
  },
  {
    name: 'UTM Link Generator',
    slug: 'utm-link-generator',
    description: 'Generate UTM-tracked URLs for campaigns.',
    category: 'url',
  },

  // Text Tools
  {
    name: 'Text Reverser',
    slug: 'text-reverser',
    description: 'Reverse text by characters or by lines.',
    category: 'text',
  },
  {
    name: 'Random Text Generator',
    slug: 'random-text-generator',
    description: 'Generate random words/sentences for test data.',
    category: 'text',
  },
  {
    name: 'Markdown to HTML',
    slug: 'markdown-to-html',
    description: 'Convert Markdown into HTML.',
    category: 'file-converters',
  },
  {
    name: 'HTML to Markdown',
    slug: 'html-to-markdown',
    description: 'Convert HTML into Markdown.',
    category: 'file-converters',
  },

  // Developer Utilities
  {
    name: 'HTTP Status Code Lookup',
    slug: 'http-status-code-lookup',
    description: 'Lookup HTTP status codes and meanings.',
    category: 'utilities',
  },
  {
    name: 'Regex Cheatsheet Generator',
    slug: 'regex-cheatsheet-generator',
    description: 'Quick regex syntax cheatsheet for developers.',
    category: 'utilities',
  },
  {
    name: 'Password Strength Checker',
    slug: 'password-strength-checker',
    description: 'Estimate password strength and provide feedback.',
    category: 'utilities',
  },
  {
    name: 'Port Number Lookup',
    slug: 'port-number-lookup',
    description: 'Lookup common TCP/UDP port numbers.',
    category: 'utilities',
  },

  // File Converters
  {
    name: 'JSON to TypeScript Interface',
    slug: 'json-to-typescript-interface',
    description: 'Generate TypeScript interfaces from JSON.',
    category: 'file-converters',
  },

  // Security Tools
  {
    name: 'bcrypt Generator',
    slug: 'bcrypt-generator',
    description: 'Generate bcrypt hashes in the browser for testing.',
    category: 'security',
  },
  {
    name: 'JWT Generator',
    slug: 'jwt-generator',
    description: 'Create a signed JWT (HS256) from header/payload.',
    category: 'security',
  },
  {
    name: 'Hash Compare',
    slug: 'hash-compare',
    description: 'Compare text vs a hash using common algorithms.',
    category: 'security',
  },
  {
    name: 'Checksum Generator',
    slug: 'checksum-generator',
    description: 'Generate checksums (SHA-256 / MD5) for text.',
    category: 'security',
  },
  {
    name: 'Random Token Generator',
    slug: 'random-token-generator',
    description: 'Generate secure random tokens for testing.',
    category: 'security',
  },

  // Web Development Tools
  {
    name: 'Htaccess Generator',
    slug: 'htaccess-generator',
    description: 'Generate common .htaccess snippets.',
    category: 'web-dev',
  },
  {
    name: 'Favicon Generator',
    slug: 'favicon-generator',
    description: 'Generate a simple favicon data URL from text/color.',
    category: 'web-dev',
  },
  {
    name: 'Open Graph Preview',
    slug: 'open-graph-preview',
    description: 'Preview how Open Graph meta tags render as a card.',
    category: 'web-dev',
  },
];

export const tools: Tool[] = RAW_TOOLS.map((t) => ({
  ...t,
  tags: buildTags(t.slug, t.category),
}));

export function getTool(slug: string) {
  return tools.find((t) => t.slug === slug);
}

export function getRelated(slug: string, limit = 4) {
  const current = getTool(slug);
  if (!current) return [];
  const same = tools.filter((t) => t.category === current.category && t.slug !== slug);
  const other = tools.filter((t) => t.category !== current.category);
  return [...same, ...other].slice(0, limit);
}

/** Curated high-intent tools for homepage “Top tools” (internal linking + SEO). */
export const TOP_TOOL_SLUGS = [
  'json-formatter',
  'base64-encoder',
  'regex-tester',
  'jwt-decoder',
  'uuid-generator',
  'json-validator',
  'html-minifier',
  'query-string-parser',
] as const;

export function getTopTools(): Array<{
  name: string;
  description: string;
  slug: string;
  href: string;
}> {
  return TOP_TOOL_SLUGS.map((slug) => {
    const t = tools.find((x) => x.slug === slug);
    return t
      ? { name: t.name, description: t.description, slug: t.slug, href: `/${t.slug}` }
      : null;
  }).filter(Boolean) as Array<{
    name: string;
    description: string;
    slug: string;
    href: string;
  }>;
}

export function getPopularTools(): Array<{ name: string; description: string; slug: string; href: string }> {
  return POPULAR_TOOL_SLUGS.map((slug) => {
    const t = tools.find((x) => x.slug === slug);
    return t ? { name: t.name, description: t.description, slug: t.slug, href: `/${t.slug}` } : null;
  }).filter(Boolean) as Array<{ name: string; description: string; slug: string; href: string }>;
}

