import type { ReactNode } from 'react';
import Link from 'next/link';
import { getRelatedTools } from '@/lib/getRelatedTools';
import { PopularTools } from '@/components/tools/PopularTools';
import { ShareResultButton } from '@/components/tools/ShareResultButton';
import { TrackToolVisit } from '@/components/tools/TrackToolVisit';

interface ToolLayoutProps {
  title: string;
  description: string;
  slug: string;
  children: ReactNode;
  howToUse: ReactNode;
  exampleUsage?: ReactNode;
  whatIs?: ReactNode;
  /** When set, shows a Share Result button that saves and copies a result URL */
  shareData?: { input: string; output: string };
}

const cardClass =
  'bg-white p-6 sm:p-9 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)]';

export function ToolLayout({
  title,
  description,
  slug,
  children,
  howToUse,
  exampleUsage,
  whatIs,
  shareData,
}: ToolLayoutProps) {
  const related = getRelatedTools(slug);

  return (
    <div className="wrapper py-8 md:py-12">
      <TrackToolVisit slug={slug} />
      <div className="mb-8 max-w-5xl mx-auto">
        <h1 className="mb-3 font-bold text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
          {title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 leading-6 max-w-3xl">
          {description}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-1 max-w-5xl mx-auto w-full">
        {/* Input / Output / Actions - main card */}
        <div className={cardClass}>
          {shareData != null && (
            <div className="mb-4 flex justify-end">
              <ShareResultButton
                toolSlug={slug}
                input={shareData.input}
                output={shareData.output}
              />
            </div>
          )}
          {children}
        </div>

        {whatIs && (
          <div className={cardClass}>
            <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">
              What is {title}?
            </h2>
            <div className="text-gray-500 dark:text-gray-400 leading-6 prose prose-sm dark:prose-invert max-w-none">
              {whatIs}
            </div>
          </div>
        )}

        {exampleUsage && (
          <div className={cardClass}>
            <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">
              Example usage
            </h2>
            <div className="text-gray-500 dark:text-gray-400 leading-6 prose prose-sm dark:prose-invert max-w-none">
              {exampleUsage}
            </div>
          </div>
        )}

        <div className={cardClass}>
          <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">
            How to use
          </h2>
          <div className="text-gray-500 dark:text-gray-400 leading-6 prose prose-sm dark:prose-invert max-w-none">
            {howToUse}
          </div>
        </div>

        {related.length > 0 && (
          <div className={cardClass}>
            <h2 className="mb-6 text-xl font-bold text-gray-800 dark:text-white/90">
              Related Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((tool) => (
                <div
                  key={tool.slug}
                  className="bg-white p-6 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)] hover:border-primary-200 dark:hover:border-primary-500/30 transition flex flex-col"
                >
                  <h3 className="mb-2 text-lg font-bold text-gray-800 dark:text-white/90">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-6 flex-1">
                    {tool.description}
                  </p>
                  <Link
                    href={tool.href}
                    className="mt-4 inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition w-fit"
                  >
                    Open Tool
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={cardClass}>
          <PopularTools />
        </div>
      </div>
    </div>
  );
}
