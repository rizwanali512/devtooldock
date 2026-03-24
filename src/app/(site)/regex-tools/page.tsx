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
        'Regex tools are critical for validation, extraction, sanitization, and search workflows across modern development stacks. Developers use regular expressions in frontend forms, backend request guards, log parsing scripts, and data migration utilities. This page is built as an SEO regex hub with keyword-rich content and direct internal links so search intent like "regex tester online" or "regex generator for developers" lands on actionable pages quickly.',
        'DevToolDock combines practical regex utilities with related text and parsing tools to support complete debugging workflows. You can test patterns against realistic input, generate starter expressions, and translate complex regex into plain English before deployment. This lowers the risk of brittle patterns, catastrophic backtracking, and unexpected matches in production environments where malformed input can cause security and reliability issues.',
        'The strongest regex process includes iterative testing and clear documentation. Start with a focused pattern, validate with edge cases, review greediness and anchors, then store examples for future maintenance. This landing page links those steps together by connecting regex tools with string transformers, diff checks, and utility references, creating a crawl-friendly path structure and a practical workflow for developers.',
        'Use this page as your central route for regular expression tooling and related text operations. It improves discoverability across the site while giving engineers a compact starting point for pattern debugging. If your workflow expands into JSON processing, encoding checks, or URL parsing, use the linked categories and homepage to continue through connected tools without losing context.',
      ]}
      filter={{
        type: 'mixed',
        categories: ['text', 'utilities'],
        slugs: [
          'regex-tester',
          'regex-generator',
          'regex-explainer',
          'regex-cheatsheet-generator',
          'query-string-parser',
          'url-parser',
          'json-formatter',
          'json-validator',
          'markdown-to-html',
          'html-to-markdown',
          'http-status-code-lookup',
          'password-strength-checker',
          'slug-generator',
          'word-counter',
        ],
      }}
      toolGroups={[
        {
          title: 'Regex creation and debugging',
          slugs: [
            'regex-tester',
            'regex-generator',
            'regex-explainer',
            'regex-cheatsheet-generator',
            'remove-duplicate-lines',
            'text-diff-checker',
          ],
        },
        {
          title: 'Text cleanup and transformation',
          slugs: [
            'case-converter',
            'slug-generator',
            'sort-text-lines',
            'word-counter',
            'random-string-generator',
            'text-reverser',
          ],
        },
        {
          title: 'Input validation support tools',
          slugs: [
            'json-validator',
            'json-formatter',
            'query-string-parser',
            'url-parser',
            'password-strength-checker',
            'http-status-code-lookup',
          ],
        },
      ]}
      useCases={[
        'Validate an email, username, or slug pattern with start/end anchors.',
        'Debug flags like g/i/m and see how they change matches in real time.',
        'Extract IDs (UUIDs, order numbers) from logs using capture groups.',
        'Generate a base pattern for a common task, then refine it for your constraints.',
        'Explain a legacy regex so you can safely update it without breaking production rules.',
      ]}
      conclusion={[
        'Reliable regular expressions are specific, test-backed, and understandable by the next developer who inherits them. Keep patterns small, anchored, and reviewed with realistic examples.',
        'This regex hub improves indexing by connecting pattern-focused pages with adjacent validation and parsing tools, creating multiple crawl paths into high-intent developer pages.',
        'When a regex becomes business-critical, save examples and plain-language explanations alongside it. That one step prevents regressions and makes future refactors safer.',
      ]}
      extraLinks={[
        { href: '/', label: 'Homepage' },
        { href: '/categories', label: 'Categories' },
        { href: '/text-tools', label: 'Text Tools' },
        { href: '/blog', label: 'Read Regex Guides' },
      ]}
    />
  );
}

