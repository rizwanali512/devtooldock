import type { ReactNode } from 'react';
import { ShareResultButton } from '@/components/tools/ShareResultButton';
import { TrackToolVisit } from '@/components/tools/TrackToolVisit';
import { ToolSEOContent } from '@/components/ToolSEOContent';
import { RelatedTools } from '@/components/RelatedTools';
import { PopularTools } from '@/components/PopularTools';
import { MoreFromCategory } from '@/components/MoreFromCategory';

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
  return (
    <div className="wrapper py-8 md:py-12">
      <TrackToolVisit slug={slug} />
      <div className="mb-8 max-w-5xl mx-auto">
        <h1 className="mb-3 font-bold text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
          {title}
        </h1>
        <p className="text-gray-700 dark:text-gray-300 leading-6 max-w-3xl">
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

        {/* SEO: introduction, how to use, use cases, FAQ (semantic article below tool UI) */}
        <ToolSEOContent title={title} description={description} slug={slug} />

        {whatIs && (
          <div className={cardClass}>
            <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">
              What is {title}?
            </h2>
            <div className="text-gray-700 dark:text-gray-300 leading-6 prose prose-sm dark:prose-invert max-w-none">
              {whatIs}
            </div>
          </div>
        )}

        {exampleUsage && (
          <div className={cardClass}>
            <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">
              Example usage
            </h2>
            <div className="text-gray-700 dark:text-gray-300 leading-6 prose prose-sm dark:prose-invert max-w-none">
              {exampleUsage}
            </div>
          </div>
        )}

        <div className={cardClass}>
          <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">
            How to use
          </h2>
          <div className="text-gray-700 dark:text-gray-300 leading-6 prose prose-sm dark:prose-invert max-w-none">
            {howToUse}
          </div>
        </div>

        <RelatedTools toolSlug={slug} />
        <PopularTools excludeSlug={slug} max={6} />
        <MoreFromCategory toolSlug={slug} />
      </div>
    </div>
  );
}
