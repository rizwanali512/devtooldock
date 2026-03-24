import type { Metadata } from 'next';
import { ToolsLandingPage } from '@/components/seo/ToolsLandingPage';
import { getBaseUrl } from '@/lib/site-url';
import { DEFAULT_KEYWORDS } from '@/lib/seo';

const path = '/free-developer-tools';
const canonical = getBaseUrl() + path;

export const metadata: Metadata = {
  title: 'Free Developer Tools | DevToolDock',
  description:
    'A curated list of free developer tools: JSON utilities, regex tools, Base64 encoders/decoders, and web helpers. Fast, browser-based, and built for daily use.',
  keywords: `${DEFAULT_KEYWORDS}, free developer tools, online developer tools, json formatter, regex tester, base64 encoder`,
  alternates: { canonical },
  openGraph: {
    title: 'Free Developer Tools | DevToolDock',
    description:
      'A curated list of free developer tools: JSON utilities, regex tools, Base64 encoders/decoders, and web helpers. Fast, browser-based, and built for daily use.',
    url: canonical,
    type: 'website',
    siteName: 'DevToolDock',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Developer Tools | DevToolDock',
    description:
      'A curated list of free developer tools: JSON utilities, regex tools, Base64 encoders/decoders, and web helpers. Fast, browser-based, and built for daily use.',
  },
};

export default function FreeDeveloperToolsPage() {
  return (
    <ToolsLandingPage
      h1="Free Developer Tools"
      intro={[
        'Free developer tools are most valuable when they remove repeated friction from real workflows: inspecting API payloads, validating JSON, testing regex patterns, decoding tokens, and converting formats during debugging. This page is designed as an indexing hub for those tasks, with direct links to high-intent utilities that developers search for every day. Instead of bouncing between disconnected websites, you can move through a single internal path from category pages to specific tools and back to related workflows.',
        'DevToolDock focuses on practical, browser-based utilities that work instantly with no signup wall for basic usage. You can format and validate JSON, compare payload changes, convert between CSV/XML/YAML, run Base64 and URL encoding checks, and inspect JWT claims in seconds. These tools help frontend, backend, QA, and DevOps teams handle the small but critical transformations that happen across tickets, incidents, and release pipelines.',
        'This SEO landing page intentionally connects broad keywords like free online developer tools, coding tools, and web developer utilities to specific tool pages with clear intent. Search crawlers get a dense, meaningful link structure, and users get a faster route to the exact operation they need. If you prefer to browse by taxonomy first, open Categories; if you want full discovery, use All Tools; if you want immediate action, jump straight into any tool card below.',
        'A reliable toolbelt usually starts with a compact core: one JSON formatter, one validator, one regex tester, one encoding utility, and one security helper. From there, teams expand into file converters, text transformers, and reference utilities such as HTTP and port lookups. Use this page as your central launchpad for free developer tools, then branch into focused hubs like JSON tools, regex tools, encoding tools, and developer utilities as your workflow grows.',
      ]}
      filter={{
        type: 'slugs',
        slugs: [
          'json-formatter',
          'json-validator',
          'json-pretty-print',
          'json-minifier',
          'json-to-csv',
          'csv-to-json',
          'json-to-xml',
          'json-to-yaml',
          'yaml-to-json',
          'xml-to-json',
          'regex-tester',
          'regex-generator',
          'regex-explainer',
          'base64-encoder',
          'base64-decoder',
          'url-encoder',
          'url-decoder',
          'html-encoder',
          'html-decoder',
          'jwt-decoder',
          'url-encoder',
          'uuid-generator',
          'uuid-validator',
          'sha256-generator',
          'checksum-generator',
          'query-string-parser',
          'http-status-code-lookup',
        ],
      }}
      toolGroups={[
        {
          title: 'JSON and data formatting',
          slugs: [
            'json-formatter',
            'json-validator',
            'json-pretty-print',
            'json-minifier',
            'json-diff-viewer',
            'json-to-csv',
            'csv-to-json',
          ],
        },
        {
          title: 'Regex and text debugging',
          slugs: [
            'regex-tester',
            'regex-generator',
            'regex-explainer',
            'regex-cheatsheet-generator',
            'word-counter',
            'case-converter',
          ],
        },
        {
          title: 'Encoding and security checks',
          slugs: [
            'base64-encoder',
            'base64-decoder',
            'url-encoder',
            'url-decoder',
            'jwt-decoder',
            'uuid-generator',
            'sha256-generator',
          ],
        },
      ]}
      useCases={[
        'Quickly format and validate API responses before debugging business logic.',
        'Test regex patterns with realistic text examples and verify flags.',
        'Encode/decode Base64 during token troubleshooting or data URL workflows.',
        'Decode JWTs to inspect claims like exp, aud, and iss during auth debugging.',
        'Parse and fix URL-encoded query strings and parameters.',
      ]}
      conclusion={[
        'A great free developer toolkit is discoverable, consistent, and tightly linked. The more clearly tools connect by workflow, the easier it is for both users and search engines to navigate from broad intent to precise actions.',
        'Use this hub as your primary entry point, then move to focused pages for JSON, regex, encoding, and utility-specific tasks. That pattern improves crawl depth while keeping your daily debugging workflow fast.',
        'If you are standardizing a team stack, choose 8-12 daily-driver tools from this list and bookmark them. Shared conventions around formatting, validation, and encoding dramatically reduce handoff friction across projects.',
      ]}
      extraLinks={[
        { href: '/', label: 'Homepage' },
        { href: '/categories', label: 'Categories' },
        { href: '/blog', label: 'SEO Blog Posts' },
      ]}
    />
  );
}

