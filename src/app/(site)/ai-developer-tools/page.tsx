import type { Metadata } from 'next';
import Link from 'next/link';
import { aiTools } from '@/lib/ai-tools';
import { canonical, DEFAULT_KEYWORDS } from '@/lib/seo';

const canonicalUrl = canonical('/ai-developer-tools');

export const metadata: Metadata = {
  title: 'AI Developer Tools | DevToolDock',
  description:
    'AI developer tools for productivity: generate code, SQL, and developer text with AI utilities. Explore DevToolDock AI tools built for day-to-day workflows.',
  keywords: `${DEFAULT_KEYWORDS}, ai developer tools, ai tools for developers, ai code generator, ai sql generator`,
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: 'AI Developer Tools | DevToolDock',
    description:
      'AI developer tools for productivity: generate code, SQL, and developer text with AI utilities. Explore DevToolDock AI tools built for day-to-day workflows.',
    url: canonicalUrl,
    type: 'website',
    siteName: 'DevToolDock',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Developer Tools | DevToolDock',
    description:
      'AI developer tools for productivity: generate code, SQL, and developer text with AI utilities. Explore DevToolDock AI tools built for day-to-day workflows.',
  },
};

const intro = [
  'AI developer tools help reduce the “blank page” problem: generating a first draft, summarizing input, or producing structured output like SQL or API documentation. Used well, AI speeds up routine tasks while keeping humans in control of correctness and security.',
  'This page is a developer-focused guide to the AI utilities on DevToolDock. Each tool below opens a focused workspace where you describe what you need and get an editable draft back. Pair them with the classic, deterministic utilities (formatters, validators, encoders) to verify inputs and outputs as you iterate.',
];

const useCases = [
  'Draft boilerplate code and then refine it to match your project conventions.',
  'Generate SQL queries from requirements and validate results before running them.',
  'Create commit messages, changelogs, or API documentation drafts quickly.',
  'Turn a rough prompt into a structured output for a ticket or PR description.',
  'Improve productivity on repetitive tasks while keeping review and security checks in place.',
];

const conclusion = [
  'AI tools are most useful when they produce an editable first draft. Always review generated output, especially for security and correctness.',
  'If you’re building internal tooling or improving developer experience, AI utilities can remove repetitive writing and boilerplate. Just keep the feedback loop tight: generate → validate → test → refine.',
];

const cardClass =
  'bg-white p-6 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)] hover:border-primary-200 dark:hover:border-primary-500/30 transition flex flex-col';

export default function AIDeveloperToolsLandingPage() {
  return (
    <div className="wrapper py-14 md:py-28">
      <div className="max-w-3xl mx-auto">
        <h1 className="mb-4 font-bold text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
          AI Developer Tools
        </h1>

        <div className="space-y-4 text-gray-500 dark:text-gray-400 leading-7">
          {intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="/ai-tools"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition"
          >
            Browse all AI tools
          </Link>
          <Link
            href="/tools"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
          >
            Classic utilities
          </Link>
        </div>

        <section className="mt-10" aria-label="AI developer tools list">
          <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">
            AI tools for developers
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiTools.map((tool) => (
              <article key={tool.slug} className={cardClass}>
                <div className="mb-3">
                  <span className="inline-flex items-center rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300">
                    AI
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-800 dark:text-white/90">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-6 flex-1">
                  {tool.metaDescription}
                </p>
                <Link
                  href={`/ai/${tool.slug}`}
                  className="mt-4 inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition w-fit"
                >
                  Open Tool
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12" aria-label="Use cases">
          <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">
            Common use cases
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-500 dark:text-gray-400 leading-7">
            {useCases.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
        </section>

        <section className="mt-12" aria-label="Final thoughts">
          <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">
            Final thoughts
          </h2>
          <div className="space-y-4 text-gray-500 dark:text-gray-400 leading-7">
            {conclusion.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

