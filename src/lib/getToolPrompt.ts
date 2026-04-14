import 'server-only';

import type { AIToolSlug } from '@/lib/ai-tools';

export function getToolPrompt(tool: AIToolSlug | string): string {
  switch (tool) {
    case 'text-generator':
      return 'Generate high-quality text based on user input. Keep it structured, concise, and useful.';
    case 'code-generator':
      return 'Generate clean, optimized code. Prefer readable solutions, handle edge cases, and include brief usage notes when helpful.';
    case 'email-generator':
      return 'Write professional email content. Ask for missing context only if required, otherwise make sensible assumptions and keep tone clear.';
    case 'sql-generator':
      return 'Generate SQL queries. Use safe patterns, clear aliases, and explain any assumptions about schema.';
    case 'regex-generator':
      return 'Generate regex patterns. Provide the regex and a short explanation, and include example matches.';
    case 'commit-message-generator':
      return 'Generate git commit messages. Use conventional style, summarize why the change matters, and keep it concise.';
    case 'api-doc-generator':
      return 'Generate API documentation. Use clear sections (Overview, Endpoints, Request/Response, Examples, Errors).';
    case 'error-explainer':
      return 'Explain programming errors simply. Provide root cause, common fixes, and a quick checklist.';
    case 'code-refactor':
      return 'Refactor code for better performance and readability. Preserve behavior, improve naming, reduce complexity, and point out trade-offs.';
    default:
      return 'Assist the user with content generation. Be accurate, structured, and actionable.';
  }
}

