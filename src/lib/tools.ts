export type ToolCategory =
  | 'JSON Tools'
  | 'Encoding Tools'
  | 'Security Tools'
  | 'Text Tools'
  | 'Web Development Tools'
  | 'File Converters'
  | 'AI Developer Tools'
  | 'Date & Time Tools'
  | 'Color Tools'
  | 'URL Tools'
  | 'Developer Utilities';

export type Tool = {
  name: string;
  slug: string;
  description: string;
  category: ToolCategory;
};

export const tools: Tool[] = [
  // JSON Tools
  {
    name: 'JSON Formatter',
    slug: 'json-formatter',
    description: 'Format, validate, and beautify JSON with syntax highlighting.',
    category: 'JSON Tools',
  },
  {
    name: 'JSON Validator',
    slug: 'json-validator',
    description: 'Validate JSON syntax and get clear error messages.',
    category: 'JSON Tools',
  },
  {
    name: 'JSON to CSV',
    slug: 'json-to-csv',
    description: 'Convert JSON array to CSV format.',
    category: 'JSON Tools',
  },
  {
    name: 'CSV to JSON',
    slug: 'csv-to-json',
    description: 'Convert CSV text to JSON array.',
    category: 'JSON Tools',
  },
  {
    name: 'JSON to XML',
    slug: 'json-to-xml',
    description: 'Convert JSON to XML format.',
    category: 'JSON Tools',
  },
  {
    name: 'JSON Minifier',
    slug: 'json-minifier',
    description: 'Minify JSON by removing whitespace and newlines.',
    category: 'JSON Tools',
  },
  {
    name: 'JSON Pretty Print',
    slug: 'json-pretty-print',
    description: 'Format JSON with indentation for readability.',
    category: 'JSON Tools',
  },

  // File Converters
  {
    name: 'XML to JSON',
    slug: 'xml-to-json',
    description: 'Convert XML into JSON format.',
    category: 'File Converters',
  },
  {
    name: 'JSON to YAML',
    slug: 'json-to-yaml',
    description: 'Convert JSON into YAML.',
    category: 'File Converters',
  },
  {
    name: 'YAML to JSON',
    slug: 'yaml-to-json',
    description: 'Convert YAML into JSON.',
    category: 'File Converters',
  },
  {
    name: 'CSV to TSV',
    slug: 'csv-to-tsv',
    description: 'Convert CSV into TSV.',
    category: 'File Converters',
  },
  {
    name: 'TSV to CSV',
    slug: 'tsv-to-csv',
    description: 'Convert TSV into CSV.',
    category: 'File Converters',
  },
  {
    name: 'Base64 to Image',
    slug: 'base64-to-image',
    description: 'Preview Base64 image data as an image.',
    category: 'File Converters',
  },
  {
    name: 'Image to Base64',
    slug: 'image-to-base64',
    description: 'Convert an image file to Base64 (data URL).',
    category: 'File Converters',
  },

  // Encoding Tools
  {
    name: 'Base64 Encoder',
    slug: 'base64-encoder',
    description: 'Encode text to Base64.',
    category: 'Encoding Tools',
  },
  {
    name: 'Base64 Decoder',
    slug: 'base64-decoder',
    description: 'Decode Base64 to text.',
    category: 'Encoding Tools',
  },
  {
    name: 'URL Encoder',
    slug: 'url-encoder',
    description: 'Encode text for use in URLs.',
    category: 'URL Tools',
  },
  {
    name: 'URL Decoder',
    slug: 'url-decoder',
    description: 'Decode URL-encoded text.',
    category: 'URL Tools',
  },
  {
    name: 'HTML Encoder',
    slug: 'html-encoder',
    description: 'Encode text to HTML entities.',
    category: 'Encoding Tools',
  },
  {
    name: 'HTML Decoder',
    slug: 'html-decoder',
    description: 'Decode HTML entities to text.',
    category: 'Encoding Tools',
  },

  // Security Tools
  {
    name: 'JWT Decoder',
    slug: 'jwt-decoder',
    description: 'Decode and inspect JWT header and payload.',
    category: 'Security Tools',
  },
  {
    name: 'UUID Generator',
    slug: 'uuid-generator',
    description: 'Generate UUID v4 identifiers.',
    category: 'Security Tools',
  },
  {
    name: 'UUID Validator',
    slug: 'uuid-validator',
    description: 'Validate UUID strings (v1–v5).',
    category: 'Security Tools',
  },
  {
    name: 'Password Generator',
    slug: 'password-generator',
    description: 'Generate secure random passwords.',
    category: 'Security Tools',
  },
  {
    name: 'SHA256 Generator',
    slug: 'sha256-generator',
    description: 'Compute SHA-256 hash of text.',
    category: 'Security Tools',
  },
  {
    name: 'MD5 Generator',
    slug: 'md5-generator',
    description: 'Compute MD5 hash of text.',
    category: 'Security Tools',
  },

  // Text Tools
  {
    name: 'Regex Tester',
    slug: 'regex-tester',
    description: 'Test regular expressions and highlight matches.',
    category: 'Text Tools',
  },
  {
    name: 'Regex Generator',
    slug: 'regex-generator',
    description: 'Generate regular expressions from common patterns.',
    category: 'Text Tools',
  },
  {
    name: 'Regex Explainer',
    slug: 'regex-explainer',
    description: 'Explain regular expressions in plain language.',
    category: 'Text Tools',
  },
  {
    name: 'Text Diff Checker',
    slug: 'text-diff-checker',
    description: 'Compare two texts and see differences.',
    category: 'Text Tools',
  },
  {
    name: 'Remove Duplicate Lines',
    slug: 'remove-duplicate-lines',
    description: 'Remove duplicate lines from text.',
    category: 'Text Tools',
  },
  {
    name: 'Sort Text Lines',
    slug: 'sort-text-lines',
    description: 'Sort lines of text alphabetically.',
    category: 'Text Tools',
  },
  {
    name: 'Word Counter',
    slug: 'word-counter',
    description: 'Count words, characters, and lines.',
    category: 'Text Tools',
  },
  {
    name: 'Case Converter',
    slug: 'case-converter',
    description: 'Convert text to camelCase, snake_case, kebab-case, and more.',
    category: 'Text Tools',
  },
  {
    name: 'Slug Generator',
    slug: 'slug-generator',
    description: 'Generate URL-friendly slugs from text.',
    category: 'Text Tools',
  },
  {
    name: 'Random String Generator',
    slug: 'random-string-generator',
    description: 'Generate random strings with configurable charset.',
    category: 'Text Tools',
  },
  {
    name: 'Lorem Ipsum Generator',
    slug: 'lorem-ipsum-generator',
    description: 'Generate placeholder lorem ipsum text.',
    category: 'Text Tools',
  },
  {
    name: 'JSON Diff Viewer',
    slug: 'json-diff-viewer',
    description: 'Compare two JSON objects and show differences.',
    category: 'Text Tools',
  },

  // Web Development Tools
  {
    name: 'CSS Minifier',
    slug: 'css-minifier',
    description: 'Minify CSS code.',
    category: 'Web Development Tools',
  },
  {
    name: 'CSS Beautifier',
    slug: 'css-beautifier',
    description: 'Format and beautify CSS.',
    category: 'Web Development Tools',
  },
  {
    name: 'JS Minifier',
    slug: 'js-minifier',
    description: 'Minify JavaScript code.',
    category: 'Web Development Tools',
  },
  {
    name: 'HTML Minifier',
    slug: 'html-minifier',
    description: 'Minify HTML by removing comments and extra whitespace.',
    category: 'Web Development Tools',
  },
  {
    name: 'JS Beautifier',
    slug: 'js-beautifier',
    description: 'Format and beautify JavaScript.',
    category: 'Web Development Tools',
  },
  {
    name: 'Meta Tag Generator',
    slug: 'meta-tag-generator',
    description: 'Generate common SEO meta tags for a page.',
    category: 'Web Development Tools',
  },
  {
    name: 'Robots.txt Generator',
    slug: 'robots-txt-generator',
    description: 'Generate a robots.txt file for your site.',
    category: 'Web Development Tools',
  },

  // Developer Utilities (kept under Web Dev for now? No—map to Web Development Tools? The requested category list does not include Utilities.
  // We place them under Web Development Tools to keep the system limited to the requested categories.
  {
    name: 'Timestamp Converter',
    slug: 'timestamp-converter',
    description: 'Convert date/time ↔ timestamp.',
    category: 'Date & Time Tools',
  },
  {
    name: 'Unix Timestamp Converter',
    slug: 'unix-timestamp-converter',
    description: 'Convert Unix timestamp seconds ↔ date/time.',
    category: 'Date & Time Tools',
  },
  {
    name: 'Color Converter',
    slug: 'color-converter',
    description: 'Convert HEX ↔ RGB ↔ HSL.',
    category: 'Color Tools',
  },
  {
    name: 'URL Parser',
    slug: 'url-parser',
    description: 'Parse a URL into components and query params.',
    category: 'URL Tools',
  },
  {
    name: 'HTTP Header Parser',
    slug: 'http-header-parser',
    description: 'Parse raw HTTP headers into key/value pairs.',
    category: 'Web Development Tools',
  },
  {
    name: 'Cron Expression Generator',
    slug: 'cron-expression-generator',
    description: 'Build a cron expression from common fields.',
    category: 'Web Development Tools',
  },

  // AI Developer Tools (placeholder for future)
  // Date & Time Tools
  {
    name: 'Date Difference Calculator',
    slug: 'date-difference-calculator',
    description: 'Calculate the difference between two dates.',
    category: 'Date & Time Tools',
  },
  {
    name: 'Timezone Converter',
    slug: 'timezone-converter',
    description: 'Convert a date/time between common timezones.',
    category: 'Date & Time Tools',
  },
  {
    name: 'Date Format Converter',
    slug: 'date-format-converter',
    description: 'Convert dates between common formats.',
    category: 'Date & Time Tools',
  },

  // Color Tools
  {
    name: 'HEX to RGB',
    slug: 'hex-to-rgb',
    description: 'Convert HEX colors to RGB.',
    category: 'Color Tools',
  },
  {
    name: 'RGB to HEX',
    slug: 'rgb-to-hex',
    description: 'Convert RGB colors to HEX.',
    category: 'Color Tools',
  },
  {
    name: 'Color Picker',
    slug: 'color-picker',
    description: 'Pick a color and copy values in multiple formats.',
    category: 'Color Tools',
  },
  {
    name: 'Gradient Generator',
    slug: 'gradient-generator',
    description: 'Generate CSS gradients and preview them.',
    category: 'Color Tools',
  },
  {
    name: 'CSS Shadow Generator',
    slug: 'css-shadow-generator',
    description: 'Generate CSS box-shadow values with preview.',
    category: 'Color Tools',
  },

  // URL Tools
  {
    name: 'Query String Parser',
    slug: 'query-string-parser',
    description: 'Parse query strings into key/value pairs.',
    category: 'URL Tools',
  },
  {
    name: 'UTM Link Generator',
    slug: 'utm-link-generator',
    description: 'Generate UTM-tracked URLs for campaigns.',
    category: 'URL Tools',
  },

  // Text Tools
  {
    name: 'Text Reverser',
    slug: 'text-reverser',
    description: 'Reverse text by characters or by lines.',
    category: 'Text Tools',
  },
  {
    name: 'Random Text Generator',
    slug: 'random-text-generator',
    description: 'Generate random words/sentences for test data.',
    category: 'Text Tools',
  },
  {
    name: 'Markdown to HTML',
    slug: 'markdown-to-html',
    description: 'Convert Markdown into HTML.',
    category: 'File Converters',
  },
  {
    name: 'HTML to Markdown',
    slug: 'html-to-markdown',
    description: 'Convert HTML into Markdown.',
    category: 'File Converters',
  },

  // Developer Utilities
  {
    name: 'HTTP Status Code Lookup',
    slug: 'http-status-code-lookup',
    description: 'Lookup HTTP status codes and meanings.',
    category: 'Developer Utilities',
  },
  {
    name: 'Regex Cheatsheet Generator',
    slug: 'regex-cheatsheet-generator',
    description: 'Quick regex syntax cheatsheet for developers.',
    category: 'Developer Utilities',
  },
  {
    name: 'Password Strength Checker',
    slug: 'password-strength-checker',
    description: 'Estimate password strength and provide feedback.',
    category: 'Developer Utilities',
  },
  {
    name: 'Port Number Lookup',
    slug: 'port-number-lookup',
    description: 'Lookup common TCP/UDP port numbers.',
    category: 'Developer Utilities',
  },

  // File Converters
  {
    name: 'JSON to TypeScript Interface',
    slug: 'json-to-typescript-interface',
    description: 'Generate TypeScript interfaces from JSON.',
    category: 'File Converters',
  },

  // Security Tools
  {
    name: 'bcrypt Generator',
    slug: 'bcrypt-generator',
    description: 'Generate bcrypt hashes in the browser for testing.',
    category: 'Security Tools',
  },
  {
    name: 'JWT Generator',
    slug: 'jwt-generator',
    description: 'Create a signed JWT (HS256) from header/payload.',
    category: 'Security Tools',
  },
  {
    name: 'Hash Compare',
    slug: 'hash-compare',
    description: 'Compare text vs a hash using common algorithms.',
    category: 'Security Tools',
  },
  {
    name: 'Checksum Generator',
    slug: 'checksum-generator',
    description: 'Generate checksums (SHA-256 / MD5) for text.',
    category: 'Security Tools',
  },
  {
    name: 'Random Token Generator',
    slug: 'random-token-generator',
    description: 'Generate secure random tokens for testing.',
    category: 'Security Tools',
  },

  // Web Development Tools
  {
    name: 'Htaccess Generator',
    slug: 'htaccess-generator',
    description: 'Generate common .htaccess snippets.',
    category: 'Web Development Tools',
  },
  {
    name: 'Favicon Generator',
    slug: 'favicon-generator',
    description: 'Generate a simple favicon data URL from text/color.',
    category: 'Web Development Tools',
  },
  {
    name: 'Open Graph Preview',
    slug: 'open-graph-preview',
    description: 'Preview how Open Graph meta tags render as a card.',
    category: 'Web Development Tools',
  },
] as const;

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

/** Slugs of the most used / popular tools, in display order. */
const POPULAR_TOOL_SLUGS = [
  'json-formatter',
  'json-validator',
  'json-minifier',
  'json-pretty-print',
  'regex-tester',
  'regex-explainer',
  'base64-encoder',
  'base64-decoder',
  'url-encoder',
  'url-decoder',
  'uuid-generator',
  'uuid-validator',
  'jwt-decoder',
  'jwt-generator',
  'sha256-generator',
  'md5-generator',
  'password-generator',
  'query-string-parser',
  'http-header-parser',
  'html-minifier',
  'js-minifier',
] as const;

export function getPopularTools(): Array<{ name: string; description: string; slug: string; href: string }> {
  return POPULAR_TOOL_SLUGS.map((slug) => {
    const t = tools.find((x) => x.slug === slug);
    return t ? { name: t.name, description: t.description, slug: t.slug, href: `/${t.slug}` } : null;
  }).filter(Boolean) as Array<{ name: string; description: string; slug: string; href: string }>;
}

