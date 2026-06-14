/**
 * AI tools catalog. Each entry carries a unique `metaDescription` so that every
 * `/ai/{slug}` page renders distinct title/description content. Without this the
 * tool pages share a near-identical chat shell and Google flags them as
 * "Duplicate, Google chose a different canonical than the user".
 */
export const aiTools = [
  {
    name: 'Text Generator',
    slug: 'text-generator',
    description: 'Generate text using AI',
    metaDescription:
      'Free AI text generator for developers. Draft documentation, summaries, release notes, and copy from a short prompt, then refine the output to match your tone.',
  },
  {
    name: 'Code Generator',
    slug: 'code-generator',
    description: 'Generate code from prompts',
    metaDescription:
      'Generate code snippets instantly with AI. Turn plain-English prompts into functions, components, and boilerplate across popular languages, then review and adapt.',
  },
  {
    name: 'Email Generator',
    slug: 'email-generator',
    description: 'Generate professional emails',
    metaDescription:
      'AI email generator for professional, concise messages. Produce outreach, follow-ups, and status updates from a prompt and edit the draft before you send.',
  },
  {
    name: 'SQL Generator',
    slug: 'sql-generator',
    description: 'Convert text to SQL queries',
    metaDescription:
      'Convert plain-English requirements into SQL queries with AI. Draft SELECT, JOIN, and aggregate statements, then validate the results before running them.',
  },
  {
    name: 'Regex Generator',
    slug: 'regex-generator',
    description: 'Generate regex patterns',
    metaDescription:
      'AI regex generator that builds regular expressions from a description. Describe the pattern you need, get a tested expression, and tweak it to fit your input.',
  },
  {
    name: 'Commit Message Generator',
    slug: 'commit-message-generator',
    description: 'Generate Git commit messages',
    metaDescription:
      'Generate clear, conventional Git commit messages with AI. Summarize your changes into a concise subject and body so your history stays readable.',
  },
  {
    name: 'API Documentation Generator',
    slug: 'api-doc-generator',
    description: 'Generate API documentation',
    metaDescription:
      'AI API documentation generator. Turn endpoints, parameters, and examples into structured, readable API docs you can drop into your project.',
  },
  {
    name: 'Error Explainer',
    slug: 'error-explainer',
    description: 'Explain programming errors',
    metaDescription:
      'Paste a stack trace or error message and get a plain-English explanation with likely causes and fixes. An AI debugging assistant for everyday errors.',
  },
  {
    name: 'Code Refactor Tool',
    slug: 'code-refactor',
    description: 'Improve and refactor code',
    metaDescription:
      'AI code refactoring tool. Improve readability, simplify logic, and modernize snippets while preserving behavior—then review the diff before applying it.',
  },
] as const;

export type AIToolSlug = (typeof aiTools)[number]['slug'];

export function getAITool(slug: string) {
  return aiTools.find((t) => t.slug === slug) ?? null;
}

export function getAIToolsBySearch(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [...aiTools];
  return aiTools.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.slug.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q)
  );
}
