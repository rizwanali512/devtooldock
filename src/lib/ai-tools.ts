export const aiTools = [
  {
    name: 'Text Generator',
    slug: 'text-generator',
    description: 'Generate text using AI',
  },
  {
    name: 'Code Generator',
    slug: 'code-generator',
    description: 'Generate code from prompts',
  },
  {
    name: 'Image Generator',
    slug: 'image-generator',
    description: 'Generate images using AI',
  },
  {
    name: 'Email Generator',
    slug: 'email-generator',
    description: 'Generate professional emails',
  },
  {
    name: 'SQL Generator',
    slug: 'sql-generator',
    description: 'Convert text to SQL queries',
  },
  {
    name: 'Regex Generator',
    slug: 'regex-generator',
    description: 'Generate regex patterns',
  },
  {
    name: 'Commit Message Generator',
    slug: 'commit-message-generator',
    description: 'Generate Git commit messages',
  },
  {
    name: 'API Documentation Generator',
    slug: 'api-doc-generator',
    description: 'Generate API documentation',
  },
  {
    name: 'Error Explainer',
    slug: 'error-explainer',
    description: 'Explain programming errors',
  },
  {
    name: 'Code Refactor Tool',
    slug: 'code-refactor',
    description: 'Improve and refactor code',
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
