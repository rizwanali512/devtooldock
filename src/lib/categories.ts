import type { ToolCategory } from '@/lib/tools';
import { tools } from '@/lib/tools';

/** Convert category display name to URL slug (e.g. "JSON Tools" -> "json-tools") */
export function categoryToSlug(category: ToolCategory): string {
  return category
    .toLowerCase()
    .replace(/\s*&\s*/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Convert URL slug back to category display name */
export function slugToCategory(slug: string): ToolCategory | null {
  const entry = CATEGORY_META.find((c) => c.slug === slug);
  return entry ? (entry.name as ToolCategory) : null;
}

export const CATEGORY_DESCRIPTIONS: Record<ToolCategory, string> = {
  'JSON Tools':
    'A collection of developer utilities for working with JSON including formatters, validators, converters, and debugging tools.',
  'Encoding Tools':
    'Encode and decode text and binary data with Base64, URL encoding, HTML entities, and more.',
  'Security Tools':
    'JWT decoding, UUID generation and validation, password and hash generators for development and testing.',
  'Text Tools':
    'Regex testing, diff viewers, case conversion, slug generation, word count, and other text utilities.',
  'Web Development Tools':
    'CSS and JS minifiers and beautifiers, meta tag and robots.txt generators, and other web dev utilities.',
  'File Converters':
    'Convert between JSON, XML, YAML, CSV, TSV, and image formats.',
  'AI Developer Tools':
    'Tools for developers building with AI and LLMs.',
  'Date & Time Tools':
    'Convert between timestamps, ISO dates, and human-readable date and time.',
  'Color Tools':
    'Convert between HEX, RGB, HSL and preview colors.',
  'URL Tools':
    'Parse URLs, encode and decode query strings, and inspect URL components.',
  'Developer Utilities':
    'Handy utilities for day-to-day development: lookups, generators, parsers, and quick checks.',
};

/** Unique categories that have at least one tool */
export const CATEGORY_SLUGS = [
  ...new Set(tools.map((t) => categoryToSlug(t.category))),
] as string[];

export const CATEGORY_META = (() => {
  const seen = new Set<ToolCategory>();
  const list: { name: ToolCategory; slug: string; description: string }[] = [];
  for (const t of tools) {
    if (seen.has(t.category)) continue;
    seen.add(t.category);
    list.push({
      name: t.category,
      slug: categoryToSlug(t.category),
      description: CATEGORY_DESCRIPTIONS[t.category],
    });
  }
  return list;
})();

export function getToolsByCategory(category: ToolCategory) {
  return tools.filter((t) => t.category === category);
}
