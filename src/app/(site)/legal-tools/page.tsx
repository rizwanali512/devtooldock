import type { Metadata } from 'next';
import Link from 'next/link';
import { getBaseUrl } from '@/lib/site-url';
import { DEFAULT_KEYWORDS } from '@/lib/seo';
import { legalTools, getLegalToolCategoryLabel, type LegalToolCategory } from '@/lib/legalTools';
import LegalToolsDirectory from '@/components/legal/LegalToolsDirectory';

export const revalidate = 86400;

const path = '/legal-tools';
const canonical = getBaseUrl() + path;

export const metadata: Metadata = {
  title: 'Legal Tools | DevToolDock',
  description:
    'Free legal tools to generate website policies: privacy policy generator, terms & conditions generator, cookie policy generator, refund policy generator, and more.',
  keywords: `${DEFAULT_KEYWORDS}, legal tools, privacy policy generator, terms and conditions generator, cookie policy generator, refund policy generator, disclaimer generator`,
  alternates: { canonical },
  openGraph: {
    title: 'Legal Tools | DevToolDock',
    description:
      'Free legal tools to generate website policies: privacy policy generator, terms & conditions generator, cookie policy generator, refund policy generator, and more.',
    url: canonical,
    type: 'website',
    siteName: 'DevToolDock',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Legal Tools | DevToolDock',
    description:
      'Free legal tools to generate website policies: privacy policy generator, terms & conditions generator, cookie policy generator, refund policy generator, and more.',
  },
};

const cardClass =
  'bg-white p-6 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)] hover:border-primary-200 dark:hover:border-primary-500/30 transition flex flex-col';

const categories: Array<{ id: 'all' | LegalToolCategory; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'legal', label: getLegalToolCategoryLabel('legal') },
  { id: 'privacy', label: getLegalToolCategoryLabel('privacy') },
  { id: 'terms', label: getLegalToolCategoryLabel('terms') },
  { id: 'cookies', label: getLegalToolCategoryLabel('cookies') },
  { id: 'refunds', label: getLegalToolCategoryLabel('refunds') },
  { id: 'disclaimer', label: getLegalToolCategoryLabel('disclaimer') },
];

export default function LegalToolsPage() {
  return (
    <div className="wrapper py-14 md:py-28">
      <div className="max-w-5xl mx-auto w-full">
        <div className="mb-6 text-center">
          <div className="mx-auto">
            <h1 className="mb-2 font-bold text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
              Legal Tools
            </h1>
            <p className="text-gray-500 dark:text-gray-400 leading-6">
              Generate website policies in minutes with free legal templates.
            </p>
          </div>
        </div>

        <LegalToolsDirectory tools={legalTools} categories={categories} cardClass={cardClass} />

        <div className="mt-12 text-gray-500 dark:text-gray-400 leading-7 max-w-3xl mx-auto space-y-4">
          <p>
            Legal pages are a core part of making a website trustworthy and compliant. Visitors,
            partners, and platforms often expect a clear privacy policy, terms and conditions, and
            cookie disclosures before they will engage with a site. For product teams, these
            documents also reduce confusion by setting expectations around data collection,
            acceptable use, and refunds.
          </p>
          <p>
            DevToolDock’s Legal Tools provide structured, step-based generators for common policy
            templates. Each tool asks a small set of practical questions (site name, URL, country,
            and basic data-usage toggles) and produces a formatted document you can copy or download
            as a text file. These generators are intended as a fast starting point for teams that
            need a draft today, with clear internal links between tools so you can assemble a full
            legal toolkit in one place.
          </p>
          <p>
            Use the search and category filters above to find the right generator. If you need to
            complete a full compliance pass, start with the Privacy Policy Generator, then add the
            Terms &amp; Conditions and Cookie Policy tools. Every generated document includes a
            disclaimer noting it is informational and not legal advice.
          </p>
        </div>
      </div>
    </div>
  );
}

