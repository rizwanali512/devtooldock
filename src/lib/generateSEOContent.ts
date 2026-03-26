import { getCachedContent, setCachedContent } from '@/lib/contentCache';

export type SeoContentInput = {
  keyword: string;
  toolName: string;
  category: string;
  type: 'tool' | 'legal' | 'seo';
};

export type SeoFaq = { question: string; answer: string };

export type SeoContentOutput = {
  intro: string;
  howToUse: string[];
  useCases: string[];
  faq: SeoFaq[];
};

function hash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) h = (h * 31 + input.charCodeAt(i)) >>> 0;
  return h;
}

function pick<T>(arr: T[], n: number): T {
  return arr[n % arr.length];
}

function titleCase(s: string): string {
  return s
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function normalizeCategory(category: string): string {
  return category.replace(/-/g, ' ').trim().toLowerCase();
}

function buildUseCases(category: string, toolName: string, keyword: string): string[] {
  const c = normalizeCategory(category);
  if (c.includes('json')) {
    return [
      'Clean up API responses before debugging business logic.',
      'Validate payload structure before saving fixtures or test data.',
      'Compare and normalize JSON fields for documentation examples.',
      `Use ${toolName} while working on "${keyword}" tasks in REST/GraphQL workflows.`,
    ];
  }
  if (c.includes('legal') || ['privacy', 'terms', 'cookies', 'refunds', 'disclaimer'].includes(c)) {
    return [
      'Create a baseline policy draft for launch checklists and platform reviews.',
      'Generate a starting template for client websites and quick compliance needs.',
      'Standardize policy structure across multiple products or domains.',
      `Draft content tailored to the intent behind "${keyword}" and then customize for your exact practices.`,
    ];
  }
  if (c.includes('ai')) {
    return [
      'Generate structured copy for developer-facing documentation.',
      'Create prompt scaffolds for repeatable content workflows.',
      'Summarize inputs into a consistent, reusable format.',
      `Use ${toolName} for "${keyword}" workflows when you need quick iteration.`,
    ];
  }
  if (c.includes('encoding') || c.includes('url')) {
    return [
      'Decode/encode strings while debugging redirects and query parameters.',
      'Validate transport-safe text before storing or transmitting data.',
      'Inspect tokens and payload fragments during authentication troubleshooting.',
      `Use ${toolName} for "${keyword}" tasks when copying data between systems.`,
    ];
  }
  return [
    'Run quick checks without installing local dependencies.',
    'Create consistent output for tickets, docs, and QA handoff.',
    `Use ${toolName} to complete "${keyword}" tasks faster in your browser.`,
    'Pair results with related tools to complete multi-step workflows.',
  ];
}

function buildHowToUse(toolName: string, type: SeoContentInput['type']): string[] {
  const common = [
    `Open ${toolName} on this page.`,
    'Enter your input values.',
    'Click generate (or run the action).',
    'Copy or download the result.',
  ];
  if (type === 'legal') {
    return [
      `Open ${toolName} and fill your website name, URL, and country.`,
      'Answer any policy-specific questions (for example contact email or refund window).',
      'Generate the document and review it for accuracy.',
      'Copy or download the text and customize before publishing.',
    ];
  }
  if (type === 'seo') {
    return [
      'Use the embedded tool or generator directly on this page.',
      'Follow the steps to produce an output draft quickly.',
      'Use related links to complete adjacent tasks in the same workflow.',
      'Bookmark the page if you repeat this keyword-driven task regularly.',
    ];
  }
  return common;
}

function buildIntro(input: SeoContentInput, seed: number): string {
  const { keyword, toolName, category, type } = input;
  const c = normalizeCategory(category);
  const adjectives = ['free', 'online', 'fast', 'simple', 'reliable', 'browser-based'];
  const verbPhrases = [
    `complete "${keyword}" tasks`,
    `handle "${keyword}" workflows`,
    `work through "${keyword}" requirements`,
    `solve "${keyword}" needs`,
  ];
  const adjA = pick(adjectives, seed);
  const adjB = pick(adjectives, seed + 2);
  const verb = pick(verbPhrases, seed + 1);

  const openers = [
    `${toolName} is a ${adjA}, ${adjB} tool designed to help you ${verb} without leaving your browser.`,
    `If you searched for "${keyword}", ${toolName} is built to help you ${verb} quickly with clear, copy-friendly output.`,
    `${titleCase(keyword)} is easier when you have a focused tool. ${toolName} provides a ${adjA} workflow for ${verb}.`,
  ];

  const middleTool = [
    `Instead of stitching together scripts and one-off templates, you can run the core action here, copy the output, and move on.`,
    `The goal is consistency: predictable structure, clean formatting, and minimal steps from input to result.`,
  ];

  const middleLegal = [
    `Legal templates work best when they reflect real practices. This generator asks practical questions and produces a structured draft you can review and customize.`,
    `Because requirements vary by country and business model, treat the output as a starting point and adapt it to your product and data flows.`,
  ];

  const closer = [
    `Use the How to Use section to get a draft in minutes, then explore related links to complete adjacent steps.`,
    `Once you have a draft, review it carefully and refine it based on your actual setup and obligations.`,
  ];

  const pickMiddle =
    type === 'legal' || c.includes('legal') || ['privacy', 'terms', 'cookies', 'refunds', 'disclaimer'].includes(c)
      ? middleLegal
      : middleTool;

  const p1 = pick(openers, seed);
  const p2 = pick(pickMiddle, seed + 3);
  const p3 = pick(closer, seed + 5);

  // For SEO hub-like pages, make intro longer (multi-paragraph in one string).
  if (type === 'seo') {
    const extra = [
      `This page is intentionally keyword-specific and internally linked so it stays useful for users and indexable for search engines.`,
      `You can generate the result immediately using the embedded tool, then continue through related pages to build a complete workflow.`,
      `If your task expands, use the internal links to jump to adjacent templates and utilities without losing context.`,
    ];
    return [p1, p2, pick(extra, seed + 7), pick(extra, seed + 9), p3].join(' ');
  }

  return [p1, p2, p3].join(' ');
}

function buildFaq(toolName: string, keyword: string, type: SeoContentInput['type']): SeoFaq[] {
  const base: SeoFaq[] = [
    {
      question: `What is ${toolName}?`,
      answer: `${toolName} is a free online tool designed to help you complete "${keyword}" workflows with clean, copy-friendly output.`,
    },
    {
      question: `How do I use ${toolName}?`,
      answer:
        type === 'legal'
          ? 'Fill the site details, answer the policy-specific questions, generate the document, and then review and customize it before publishing.'
          : 'Enter your input, run the action, and copy the output into your project or documentation.',
    },
    {
      question: `Is ${toolName} free?`,
      answer: 'Yes. You can use it directly in your browser and copy or download the result.',
    },
    {
      question: `Why use ${toolName} instead of writing it manually?`,
      answer:
        'It saves time, standardizes structure, and reduces errors by giving you a consistent baseline that you can refine for your specific requirements.',
    },
  ];
  return base;
}

export function generateSEOContent(input: SeoContentInput): SeoContentOutput {
  const keyword = input.keyword.trim() || input.toolName;
  const toolName = input.toolName.trim() || 'This tool';
  const category = input.category.trim() || 'general';
  const type = input.type;

  const cacheKey = `${type}-${toolName}-${keyword}`;
  try {
    const cached = getCachedContent<SeoContentOutput>(cacheKey);
    if (cached) return cached;
  } catch {
    // cache best-effort; fall back to generating
  }

  const seed = hash([keyword, toolName, category, type].join('|'));

  const intro = buildIntro({ keyword, toolName, category, type }, seed);
  const howToUse = buildHowToUse(toolName, type);
  const useCases = buildUseCases(category, toolName, keyword).slice(0, 5);
  const faq = buildFaq(toolName, keyword, type);

  const out: SeoContentOutput = {
    intro,
    howToUse,
    useCases,
    faq,
  };
  try {
    setCachedContent(cacheKey, out);
  } catch {
    // ignore cache write failures
  }
  return out;
}

