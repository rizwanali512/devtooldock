import type { Metadata } from 'next';
import { ToolsLandingPage } from '@/components/seo/ToolsLandingPage';
import { getBaseUrl } from '@/lib/site-url';
import { DEFAULT_KEYWORDS } from '@/lib/seo';

const path = '/text-tools';
const canonical = getBaseUrl() + path;

export const metadata: Metadata = {
  title: 'Text Tools | DevToolDock',
  description:
    'Text tools for developers: regex utilities, diffing, slug and case converters, and text cleanup tools. Fast browser-based utilities for daily work.',
  keywords: `${DEFAULT_KEYWORDS}, text tools, regex tester, text diff, slug generator, case converter`,
  alternates: { canonical },
  openGraph: {
    title: 'Text Tools | DevToolDock',
    description:
      'Text tools for developers: regex utilities, diffing, slug and case converters, and text cleanup tools. Fast browser-based utilities for daily work.',
    url: canonical,
    type: 'website',
    siteName: 'DevToolDock',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Text Tools | DevToolDock',
    description:
      'Text tools for developers: regex utilities, diffing, slug and case converters, and text cleanup tools. Fast browser-based utilities for daily work.',
  },
};

export default function TextToolsLandingPage() {
  return (
    <ToolsLandingPage
      h1="Text Tools"
      intro={[
        'Text is the substrate of software: logs, config files, code snippets, IDs, payloads, and documentation. Developer productivity often comes down to how quickly you can transform text into the shape you need—without writing one-off scripts each time.',
        'DevToolDock’s text tools cover high-frequency tasks: testing regular expressions, comparing text output, generating slugs, changing casing, removing duplicates, and more. These utilities are designed to keep your workflow moving when you’re debugging or preparing data for another system.',
        'Use the curated list below, then jump to /tools and /all-tools when you need broader coverage.',
        'Text utilities are especially valuable when you’re moving data between systems: turning a title into a URL slug, cleaning a list of values from a spreadsheet, or diffing two versions of output after a refactor. Small transformations like these add up quickly—and having a consistent place to do them saves time.',
      ]}
      filter={{ type: 'categories', categories: ['Text Tools'] }}
      useCases={[
        'Debug regex validation rules and confirm matches against sample input.',
        'Compare two versions of text output when refactoring or troubleshooting.',
        'Generate URL-friendly slugs from titles and headings for content and routing.',
        'Convert casing (snake_case, camelCase, etc.) when moving between systems.',
        'Clean up text data: remove duplicates, sort lines, and count words quickly.',
      ]}
      conclusion={[
        'Text utilities are small, but they remove daily friction. Keeping them in one place makes it easier to solve problems quickly and consistently.',
        'For related workflows, explore the Regex landing pages and the Encoding tools—these categories often pair naturally with text processing tasks.',
        'If you’re debugging payloads, a typical flow is: decode (URL/Base64) → format (JSON) → validate (regex/UUID/etc.). DevToolDock is designed so those steps are a click away from each other.',
      ]}
      extraLinks={[
        { href: '/regex-tools', label: 'Regex Tools' },
        { href: '/encoding-tools', label: 'Encoding Tools' },
      ]}
    />
  );
}

