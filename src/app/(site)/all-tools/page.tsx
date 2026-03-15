import type { Metadata } from 'next';
import Link from 'next/link';
import { tools } from '@/lib/tools';
import { aiTools } from '@/lib/ai-tools';
import { CATEGORY_META, getToolsByCategory } from '@/lib/categories';
import type { ToolCategory } from '@/lib/tools';
import { getBaseUrl } from '@/lib/site-url';
import { DEFAULT_KEYWORDS } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'All Developer Tools',
  description:
    'Browse the complete collection of free developer tools and AI utilities including JSON tools, regex testers, encoders, file converters, and more.',
  keywords: `${DEFAULT_KEYWORDS}, all tools, tool index, developer utilities list`,
  alternates: { canonical: getBaseUrl() + '/all-tools' },
  openGraph: {
    title: 'All Developer Tools | DevToolDock',
    description:
      'Browse the complete collection of free developer tools and AI utilities including JSON tools, regex testers, encoders, file converters, and more.',
    url: getBaseUrl() + '/all-tools',
    type: 'website',
    siteName: 'DevToolDock',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Developer Tools | DevToolDock',
    description:
      'Browse the complete collection of free developer tools and AI utilities on DevToolDock.',
  },
};

export default function AllToolsPage() {
  return (
    <div className="wrapper py-14 md:py-28">
      <header className="max-w-3xl mx-auto mb-12 md:mb-16 text-center">
        <h1 className="mb-3 font-bold text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
          All Developer Tools
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 leading-6">
          Browse the complete collection of developer tools and AI utilities
          available on DevToolDock.
        </p>
      </header>

      <div className="max-w-4xl mx-auto space-y-12 md:space-y-14">
        {/* Developer tools grouped by category */}
        {CATEGORY_META.map((cat) => {
          const categoryTools = getToolsByCategory(cat.name as ToolCategory);
          if (categoryTools.length === 0) return null;

          return (
            <section key={cat.slug} className="scroll-mt-6">
              <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90 border-b border-gray-200 dark:border-gray-700 pb-2">
                {cat.name}
              </h2>
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {categoryTools.map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={`/${tool.slug}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 hover:underline text-sm md:text-base"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        {/* AI Tools section */}
        <section className="scroll-mt-6">
          <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90 border-b border-gray-200 dark:border-gray-700 pb-2">
            AI Tools
          </h2>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {aiTools.map((tool) => (
              <li key={tool.slug}>
                <Link
                  href={`/ai/${tool.slug}`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 hover:underline text-sm md:text-base"
                >
                  {tool.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Optional: summary for SEO */}
      <p className="mt-12 max-w-2xl mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
        DevToolDock offers {tools.length} developer tools and {aiTools.length} AI
        utilities—all free to use in your browser with no sign-up required.
      </p>
    </div>
  );
}
