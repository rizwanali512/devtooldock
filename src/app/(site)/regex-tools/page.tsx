import type { Metadata } from 'next';
import { ToolsLandingPage } from '@/components/seo/ToolsLandingPage';
import { getBaseUrl } from '@/lib/site-url';
import { DEFAULT_KEYWORDS } from '@/lib/seo';

const path = '/regex-tools';
const canonical = getBaseUrl() + path;

export const metadata: Metadata = {
  title: 'Regex Tools | DevToolDock',
  description:
    'Free regex tools for developers: test patterns, generate regex, and get plain-English explanations. Debug regular expressions quickly in your browser.',
  keywords: `${DEFAULT_KEYWORDS}, regex tools, regex tester, regex generator, regex explainer`,
  alternates: { canonical },
  openGraph: {
    title: 'Regex Tools | DevToolDock',
    description:
      'Free regex tools for developers: test patterns, generate regex, and get plain-English explanations. Debug regular expressions quickly in your browser.',
    url: canonical,
    type: 'website',
    siteName: 'DevToolDock',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Regex Tools | DevToolDock',
    description:
      'Free regex tools for developers: test patterns, generate regex, and get plain-English explanations. Debug regular expressions quickly in your browser.',
  },
};

export default function RegexToolsLandingPage() {
  return (
    <ToolsLandingPage
      h1="Regex Tools"
      intro={[
        'Regular expressions are one of the fastest ways to validate input, extract data, and automate search-and-replace—but they can also be frustrating to debug. A single missing escape or greedy quantifier can turn a “quick fix” into an hour of guesswork.',
        'DevToolDock provides a focused set of regex tools to help you build patterns confidently. Test patterns against real text, generate common expressions, and get clear explanations of what a regex is doing. Everything runs in your browser so you can iterate quickly.',
        'Use this landing page as a hub for regex-related utilities, plus internal links to the broader DevToolDock directory.',
        'When writing regex for production validation, the difference between “works on my sample” and “works for users” is test coverage. Use a tester to try real inputs (including edge cases), then keep patterns as specific as possible to avoid accidental matches and performance pitfalls.',
      ]}
      filter={{
        type: 'slugs',
        slugs: [
          'regex-tester',
          'regex-generator',
          'regex-explainer',
          'regex-cheatsheet-generator',
        ],
      }}
      useCases={[
        'Validate an email, username, or slug pattern with start/end anchors.',
        'Debug flags like g/i/m and see how they change matches in real time.',
        'Extract IDs (UUIDs, order numbers) from logs using capture groups.',
        'Generate a base pattern for a common task, then refine it for your constraints.',
        'Explain a legacy regex so you can safely update it without breaking production rules.',
      ]}
      conclusion={[
        'A good regex is specific, tested with realistic examples, and easy to reason about. Start simple, add anchors for validation, and avoid overly broad patterns like .* when you can.',
        'If your workflow includes parsing payloads, also consider pairing regex with DevToolDock’s JSON tools and encoding utilities to cover the most common debugging scenarios.',
        'If you find yourself reusing the same pattern across projects, consider documenting it with examples and a short explanation (the regex explainer can help). That makes future refactors safer and reduces onboarding time for teammates.',
      ]}
      extraLinks={[
        { href: '/text-tools', label: 'Text Tools' },
        { href: '/blog', label: 'Read Regex Guides' },
      ]}
    />
  );
}

