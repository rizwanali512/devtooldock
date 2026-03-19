import Link from 'next/link';
import { aiTools } from '@/lib/ai-tools';

type Props = {
  toolSlug: string;
  toolName: string;
  toolDescription: string;
};

function buildDescription(toolName: string, toolDescription: string) {
  return `${toolName} is an AI-powered online tool built for developer workflows. Use this free developer tool to ${toolDescription.toLowerCase()}—then refine the output to match your project conventions. AI tools are most effective when they produce a high-quality first draft: you stay in control by reviewing, testing, and iterating. This page includes common use cases and benefits so you can understand when to use ${toolName} and how to get the best results quickly.`;
}

function buildUseCases(toolSlug: string) {
  switch (toolSlug) {
    case 'code-generator':
      return [
        'Generate boilerplate code for components, utilities, or scripts',
        'Draft a function from a prompt and then adapt it to your codebase',
        'Create examples and test scaffolding to speed up development',
      ];
    case 'sql-generator':
      return [
        'Draft SQL queries from requirements and then validate them',
        'Generate SELECT/INSERT/UPDATE templates for common tasks',
        'Create query variants for different filters and joins',
      ];
    case 'api-doc-generator':
      return [
        'Draft endpoint documentation from a short description',
        'Generate request/response examples for API docs',
        'Create a structured outline for a reference page',
      ];
    case 'commit-message-generator':
      return [
        'Generate clear commit messages from a summary of changes',
        'Draft PR-ready titles and descriptions for code review',
        'Standardize commit style across a team workflow',
      ];
    default:
      return [
        'Generate a first draft, then refine it with your domain context',
        'Turn rough notes into structured output (steps, bullets, snippets)',
        'Speed up repetitive writing and drafting tasks',
      ];
  }
}

function buildBenefits() {
  return [
    'Faster first drafts for common developer tasks',
    'Less context switching—use AI and classic tools in one place',
    'Better consistency when you pair AI output with validators/formatters',
  ];
}

export function AIToolSeoContent({ toolSlug, toolName, toolDescription }: Props) {
  const desc = buildDescription(toolName, toolDescription);
  const useCases = buildUseCases(toolSlug);
  const benefits = buildBenefits();

  const related = aiTools.filter((t) => t.slug !== toolSlug).slice(0, 6);

  return (
    <div className="w-full max-w-3xl mx-auto text-left">
      <h2 className="mt-10 mb-3 text-2xl font-bold text-gray-800 dark:text-white/90">
        About this AI tool
      </h2>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{desc}</p>

      <h2 className="mt-8 mb-3 text-2xl font-bold text-gray-800 dark:text-white/90">
        Common use cases
      </h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 leading-relaxed">
        {useCases.map((u) => (
          <li key={u}>{u}</li>
        ))}
      </ul>

      <h2 className="mt-8 mb-3 text-2xl font-bold text-gray-800 dark:text-white/90">
        Benefits
      </h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 leading-relaxed">
        {benefits.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>

      <h2 className="mt-8 mb-3 text-2xl font-bold text-gray-800 dark:text-white/90">
        Related links
      </h2>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        Browse all AI utilities on{' '}
        <Link
          href="/ai-tools"
          className="text-primary-500 hover:text-primary-600 underline font-medium"
        >
          AI Tools
        </Link>{' '}
        or explore classic utilities on{' '}
        <Link
          href="/tools"
          className="text-primary-500 hover:text-primary-600 underline font-medium"
        >
          Tools
        </Link>{' '}
        and{' '}
        <Link
          href="/all-tools"
          className="text-primary-500 hover:text-primary-600 underline font-medium"
        >
          All Tools
        </Link>
        .
      </p>

      {related.length > 0 ? (
        <>
          <h2 className="mt-8 mb-3 text-2xl font-bold text-gray-800 dark:text-white/90">
            More AI tools
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 leading-relaxed">
            {related.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/ai/${t.slug}`}
                  className="text-primary-500 hover:text-primary-600 underline font-medium"
                >
                  {t.name}
                </Link>
                {t.description ? ` — ${t.description}` : ''}
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}

