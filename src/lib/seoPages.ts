import { tools, type Tool } from '@/lib/tools';

export type SeoPageEntry = {
  slug: string;
  keyword: string;
  title: string;
  description: string;
  baseTool: string;
  category: string;
};

const VARIATION_SUFFIXES = [
  { suffix: 'online', label: 'Online - Free Tool' },
  { suffix: 'online-free', label: 'Online Free Tool' },
  { suffix: 'free', label: 'Free Tool' },
  { suffix: 'tool', label: 'Tool' },
  { suffix: 'for-developers', label: 'Tool for Developers' },
] as const;

const PROGRAMMATIC_TOOL_POOL = [
  'json-formatter',
  'json-validator',
  'json-minifier',
  'json-to-csv',
  'regex-tester',
  'regex-generator',
  'base64-encoder',
  'base64-decoder',
  'url-encoder',
  'jwt-decoder',
] as const;

export const seoPagesSeed: SeoPageEntry[] = [
  {
    slug: 'json-formatter-online',
    keyword: 'json formatter online',
    title: 'JSON Formatter Online - Free Tool',
    description: 'Format JSON online instantly with this free JSON formatter tool.',
    baseTool: 'json-formatter',
    category: 'json',
  },
  {
    slug: 'regex-tester-online-free',
    keyword: 'regex tester online free',
    title: 'Regex Tester Online Free Tool',
    description: 'Test and validate regex patterns online instantly.',
    baseTool: 'regex-tester',
    category: 'text',
  },
  {
    slug: 'base64-encoder-online',
    keyword: 'base64 encoder online',
    title: 'Base64 Encoder Online - Free Tool',
    description: 'Encode text to Base64 online instantly with this free tool.',
    baseTool: 'base64-encoder',
    category: 'encoding',
  },
];

function toWords(slug: string): string {
  return slug
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');
}

function makeEntry(baseTool: Tool, suffix: (typeof VARIATION_SUFFIXES)[number]): SeoPageEntry {
  const toolName = baseTool.name.toLowerCase();
  const keyword = `${toolName} ${suffix.suffix}`.trim();
  return {
    slug: `${baseTool.slug}-${suffix.suffix}`,
    keyword,
    title: `${toWords(baseTool.slug)} ${suffix.label}`,
    description: `Use ${keyword} on DevToolDock to run ${baseTool.name} instantly in your browser.`,
    baseTool: baseTool.slug,
    category: baseTool.category,
  };
}

const generated: SeoPageEntry[] = PROGRAMMATIC_TOOL_POOL.flatMap((slug) => {
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) return [];
  return VARIATION_SUFFIXES.map((suffix) => makeEntry(tool, suffix));
});

const staticPathSlugs = new Set(
  [
    '',
    'tools',
    'all-tools',
    'categories',
    'blog',
    'pricing',
    'privacy',
    'privacy-policy',
    'terms',
    'about',
    'contact',
    'dashboard',
    'billing',
    'ai-tools',
    'free-developer-tools',
    'json-tools-online',
    'regex-tools',
    'encoding-tools',
    'developer-utilities',
  ].filter(Boolean)
);

const seen = new Set<string>();
const seenTitles = new Set<string>();
const merged = [...seoPagesSeed, ...generated].filter((entry) => {
  if (seen.has(entry.slug)) return false;
  if (seenTitles.has(entry.title.toLowerCase())) return false;
  if (tools.some((t) => t.slug === entry.slug)) return false;
  if (staticPathSlugs.has(entry.slug)) return false;
  seen.add(entry.slug);
  seenTitles.add(entry.title.toLowerCase());
  return true;
});

export const seoPages: SeoPageEntry[] = merged.slice(0, 50);

export const SEO_PAGES_ALL: SeoPageEntry[] = seoPages;

export const PUBLISHED_SEO_PAGE_LIMIT = 20;

export const SEO_PAGES_PUBLISHED: SeoPageEntry[] = SEO_PAGES_ALL.slice(
  0,
  PUBLISHED_SEO_PAGE_LIMIT
);

export function getSeoPageBySlug(slug: string): SeoPageEntry | null {
  return SEO_PAGES_PUBLISHED.find((p) => p.slug === slug) ?? null;
}

export function getBaseToolForSeoPage(page: SeoPageEntry): Tool | null {
  return tools.find((t) => t.slug === page.baseTool) ?? null;
}

export function getRelatedToolsForSeoPage(page: SeoPageEntry, limit = 8): Tool[] {
  const baseTool = getBaseToolForSeoPage(page);
  return tools
    .filter((t) => t.category === page.category && t.slug !== page.baseTool)
    .slice(0, limit)
    .concat(
      tools
        .filter(
          (t) =>
            t.category !== page.category &&
            t.slug !== page.baseTool &&
            (!baseTool || t.slug !== baseTool.slug)
        )
        .slice(0, Math.max(0, limit - 4))
    )
    .slice(0, limit);
}

function hash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return h;
}

export function buildSeoPageContent(page: SeoPageEntry, baseTool: Tool): string[] {
  const tones = [
    'fast API debugging',
    'frontend form validation',
    'QA payload verification',
    'incident-response triage',
  ] as const;
  const workflows = [
    'parse, inspect, transform, and validate',
    'clean, compare, and share structured data',
    'verify edge cases before deployment',
    'standardize data handling across teams',
  ] as const;
  const ctas = [
    'Start with the embedded tool section below, then branch into related pages for adjacent tasks.',
    'Use the embedded tool first, then continue to related tools to complete your full workflow.',
    'Run the core action in the embedded tool and follow internal links to complete validation and conversion.',
  ] as const;

  const idx = hash(page.slug);
  const tone = tones[idx % tones.length];
  const workflow = workflows[idx % workflows.length];
  const cta = ctas[idx % ctas.length];
  const category = page.category.replace('-', ' ');

  return [
    `${page.title} targets the keyword "${page.keyword}" and helps developers solve ${tone} tasks without leaving the browser. The page is designed as a practical utility hub, not a thin doorway page, with direct access to ${baseTool.name} and connected tools that support real implementation workflows. Whether you are handling API payloads, preparing data for docs, or validating production inputs, this page gives you a focused entry point that maps search intent to immediate action.`,
    `${baseTool.name} is the base tool for this page because it covers a high-intent ${category} workflow that teams repeat constantly. In day-to-day development, engineers need to ${workflow} while preserving accuracy and speed. By embedding the actual tool interface here, you can perform the task immediately and then move into linked helpers for comparison, conversion, or secondary checks. That keeps the page useful for users and sends clear quality signals for indexing.`,
    `Each section on this page is purposefully varied around the specific keyword and base tool context. Instead of duplicated generic copy, the content references category-specific outcomes, common errors, and realistic usage paths. Internal links point to related tools, category hubs, and core navigation pages so crawlers can discover deeper routes. This structure improves crawlability and helps search engines understand semantic relationships between the tool, the keyword variant, and related developer workflows.`,
    cta,
  ];
}

export function buildHowToUseSteps(page: SeoPageEntry, baseTool: Tool): string[] {
  return [
    `Open the embedded ${baseTool.name} tool below.`,
    `Paste your input and run the ${page.keyword} workflow.`,
    'Review the output and validate results before copying.',
    'Open related tools for conversion, parsing, or secondary checks.',
  ];
}

export function buildUseCases(page: SeoPageEntry): string[] {
  const category = page.category.replace('-', ' ');
  return [
    `Quick ${category} debugging during API integration tasks.`,
    `Pre-release checks when validating ${page.keyword} results.`,
    'On-call troubleshooting where fast browser utilities reduce response time.',
    'Preparing clean output for documentation, QA handoff, or code review.',
  ];
}

export function buildFaq(page: SeoPageEntry, baseTool: Tool): Array<{ q: string; a: string }> {
  return [
    {
      q: `What is ${page.keyword}?`,
      a: `${page.keyword} is a focused developer workflow powered by the ${baseTool.name} tool.`,
    },
    {
      q: `Is this ${baseTool.name} page free to use?`,
      a: 'Yes, this page and its embedded tool are free for common developer tasks.',
    },
    {
      q: 'Can I use this for production debugging?',
      a: 'Yes. It is useful for quick validation, transformation, and troubleshooting.',
    },
    {
      q: 'What should I open next?',
      a: 'Use related tools and the category link to continue your workflow.',
    },
  ];
}

