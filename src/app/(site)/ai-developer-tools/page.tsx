import type { Metadata } from 'next';
import Link from 'next/link';
import { ToolsLandingPage } from '@/components/seo/ToolsLandingPage';
import { getBaseUrl } from '@/lib/site-url';
import { DEFAULT_KEYWORDS } from '@/lib/seo';

const path = '/ai-developer-tools';
const canonical = getBaseUrl() + path;

export const metadata: Metadata = {
  title: 'AI Developer Tools | DevToolDock',
  description:
    'AI developer tools for productivity: generate code, SQL, and developer text with AI utilities. Explore DevToolDock AI tools built for day-to-day workflows.',
  keywords: `${DEFAULT_KEYWORDS}, ai developer tools, ai tools for developers, ai code generator, ai sql generator`,
  alternates: { canonical },
  openGraph: {
    title: 'AI Developer Tools | DevToolDock',
    description:
      'AI developer tools for productivity: generate code, SQL, and developer text with AI utilities. Explore DevToolDock AI tools built for day-to-day workflows.',
    url: canonical,
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

export default function AIDeveloperToolsLandingPage() {
  return (
    <>
      <ToolsLandingPage
        h1="AI Developer Tools"
        intro={[
          'AI developer tools help reduce the “blank page” problem: generating a first draft, summarizing input, or producing structured output like SQL or API documentation. Used well, AI speeds up routine tasks while keeping humans in control of correctness and security.',
          'DevToolDock includes a dedicated AI tools section (separate from the classic utilities in lib/tools.ts). This landing page provides SEO-focused structure and internal links to discover AI tools in DevToolDock.',
          'If you’re looking for the full AI catalog, jump to /ai-tools. You can also browse classic utilities on /tools and /all-tools.',
          'For best results, treat AI outputs as a draft: review, test, and adapt them to your project’s standards. In practice, AI shines when you combine it with deterministic tools (formatters, validators, encoders) to verify inputs and outputs as you iterate.',
        ]}
        filter={{ type: 'categories', categories: ['AI Developer Tools'] }}
        useCases={[
          'Draft boilerplate code and then refine it to match your project conventions.',
          'Generate SQL queries from requirements and validate results before running them.',
          'Create commit messages, changelogs, or API documentation drafts quickly.',
          'Turn a rough prompt into a structured output for a ticket or PR description.',
          'Improve productivity on repetitive tasks while keeping review and security checks in place.',
        ]}
        conclusion={[
          'AI tools are most useful when they produce an editable first draft. Always review generated output, especially for security and correctness.',
          'Explore DevToolDock’s AI catalog, then pair it with classic utilities like JSON tools, regex tools, and encoding tools for a complete developer workflow.',
          'If you’re building internal tooling or improving developer experience, AI utilities can remove repetitive writing and boilerplate. Just keep the feedback loop tight: generate → validate → test → refine.',
        ]}
        extraLinks={[
          { href: '/ai-tools', label: 'Browse AI Tools' },
          { href: '/tools', label: 'Browse Tools' },
        ]}
      />

      <div className="wrapper -mt-10 pb-14 md:pb-28">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-6">
            Looking for AI generators? Visit{' '}
            <Link
              href="/ai-tools"
              className="text-primary-500 hover:text-primary-600 underline font-medium"
            >
              /ai-tools
            </Link>{' '}
            to browse DevToolDock’s AI utilities.
          </p>
        </div>
      </div>
    </>
  );
}

