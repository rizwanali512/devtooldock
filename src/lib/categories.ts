import { tools } from '@/lib/tools';

/** Display title for each canonical category slug (matches tool.category). */
export const CATEGORY_LABELS: Record<string, string> = {
  json: 'JSON Tools',
  encoding: 'Encoding Tools',
  security: 'Security Tools',
  text: 'Text Tools',
  'web-dev': 'Web Development Tools',
  'file-converters': 'File Converters',
  ai: 'AI Developer Tools',
  datetime: 'Date & Time Tools',
  color: 'Color Tools',
  url: 'URL Tools',
  utilities: 'Developer Utilities',
};

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  json:
    'A collection of developer utilities for working with JSON including formatters, validators, converters, and debugging tools.',
  encoding:
    'Encode and decode text and binary data with Base64, URL encoding, HTML entities, and more.',
  security:
    'JWT decoding, UUID generation and validation, password and hash generators for development and testing.',
  text:
    'Regex testing, diff viewers, case conversion, slug generation, word count, and other text utilities.',
  'web-dev':
    'CSS and JS minifiers and beautifiers, meta tag and robots.txt generators, and other web dev utilities.',
  'file-converters':
    'Convert between JSON, XML, YAML, CSV, TSV, and image formats.',
  ai: 'Tools for developers building with AI and LLMs.',
  datetime:
    'Convert between timestamps, ISO dates, and human-readable date and time.',
  color: 'Convert between HEX, RGB, HSL and preview colors.',
  url: 'Parse URLs, encode and decode query strings, and inspect URL components.',
  utilities:
    'Handy utilities for day-to-day development: lookups, generators, parsers, and quick checks.',
};

/** URL slug is the same as `tool.category` (e.g. json → /category/json). */
export function categoryToSlug(category: string): string {
  return category;
}

export function getCategoryDisplayName(categorySlug: string): string {
  return CATEGORY_LABELS[categorySlug] ?? categorySlug;
}

export function slugToCategory(slug: string): string | null {
  const entry = CATEGORY_META.find((c) => c.slug === slug);
  return entry ? entry.name : null;
}

export const CATEGORY_SLUGS = [
  ...new Set(tools.map((t) => t.category)),
] as string[];

export const CATEGORY_META = (() => {
  const seen = new Set<string>();
  const list: { name: string; slug: string; description: string }[] = [];
  for (const t of tools) {
    if (seen.has(t.category)) continue;
    seen.add(t.category);
    const slug = t.category;
    list.push({
      name: CATEGORY_LABELS[slug] ?? slug,
      slug,
      description: CATEGORY_DESCRIPTIONS[slug] ?? '',
    });
  }
  return list;
})();

export function getToolsByCategory(categorySlug: string) {
  return tools.filter((t) => t.category === categorySlug);
}

/**
 * 200–300 words of indexable copy for category hub pages (ToolBaz-style hubs).
 */
export function getCategoryLongSeo(categorySlug: string, toolCount: number): string {
  const short = CATEGORY_DESCRIPTIONS[categorySlug] ?? '';
  return (
    `${short} ` +
    `DevToolDock groups these utilities so you can discover the right free online developer tool without hunting through unrelated pages. ` +
    `Each tool opens instantly in your browser, which makes this category useful when you are debugging a production issue, preparing documentation, or validating data before it reaches your API gateway. ` +
    `You will find ${toolCount} tools listed on this page; every card links directly to a dedicated page with its own instructions, FAQs, and related utilities so crawlers and users can move through a clear internal linking structure. ` +
    `That structure mirrors how engineering teams work in practice: start from a category (for example JSON or encoding), pick a focused utility, then jump to adjacent tools when your task expands. ` +
    `Because many workflows combine multiple steps—format JSON, diff two payloads, then encode a string for transport—category hubs reduce “discovered but not indexed” problems by giving search engines more context and more paths into your most important pages. ` +
    `Bookmark this category if you return to these tasks weekly, and use the sitewide directories under Tools and All Tools when you need cross-category discovery. ` +
    `For AI-assisted workflows, pair classic utilities with the AI tools section; for long-form guidance, see the blog. Together, categories, tools, and articles help you build repeatable, fast routines without installing desktop software.`
  );
}
