import type { Metadata } from 'next';
import { ToolsLandingPage } from '@/components/seo/ToolsLandingPage';
import { getBaseUrl } from '@/lib/site-url';
import { DEFAULT_KEYWORDS } from '@/lib/seo';

const path = '/developer-utilities';
const canonical = getBaseUrl() + path;

export const metadata: Metadata = {
  title: 'Developer Utilities | DevToolDock',
  description:
    'Discover practical developer utilities online: lookup tools, generators, validators, parsers, and quick reference tools for daily engineering workflows.',
  keywords: `${DEFAULT_KEYWORDS}, developer utilities, online developer utilities, http status code lookup, password strength checker, port number lookup`,
  alternates: { canonical },
  openGraph: {
    title: 'Developer Utilities | DevToolDock',
    description:
      'Discover practical developer utilities online: lookup tools, generators, validators, parsers, and quick reference tools for daily engineering workflows.',
    url: canonical,
    type: 'website',
    siteName: 'DevToolDock',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Developer Utilities | DevToolDock',
    description:
      'Discover practical developer utilities online: lookup tools, generators, validators, parsers, and quick reference tools for daily engineering workflows.',
  },
};

export default function DeveloperUtilitiesPage() {
  return (
    <ToolsLandingPage
      h1="Developer Utilities"
      intro={[
        'Developer utilities are the tools you reach for when shipping quickly: quick lookups, parsers, validators, generators, and conversion helpers that reduce friction between coding and debugging. While large frameworks get attention, these smaller utilities often save the most time during implementation and incident response. This page is built as an SEO indexing hub that connects broad utility intent to specific, high-value tool pages.',
        'DevToolDock collects practical browser-based developer utilities for real production workflows. You can check HTTP status meanings, evaluate password strength, inspect common ports, parse URL structures, generate secure tokens, and convert timestamps during on-call troubleshooting. These are cross-functional tools used by frontend engineers, backend developers, QA teams, and DevOps practitioners when they need answers immediately without installing extra software.',
        'From a crawlability perspective, utility pages perform best when they are linked through clear thematic groups and related categories. This landing page uses that structure to create meaningful internal paths from homepage to category hubs and then to individual tools. Search engines gain clearer context around each utility intent, and users get a shorter route from broad discovery queries to exact actions.',
        'Use this hub as your launch point for day-to-day engineering helpers. Start with lookup and validation tasks, then branch into security generators, URL utilities, and date/time converters. If your workflow expands into payload cleanup or regex debugging, continue to linked JSON, encoding, and regex hubs for deeper tool coverage.',
      ]}
      filter={{
        type: 'slugs',
        slugs: [
          'http-status-code-lookup',
          'port-number-lookup',
          'regex-cheatsheet-generator',
          'password-strength-checker',
          'url-parser',
          'query-string-parser',
          'timestamp-converter',
          'unix-timestamp-converter',
          'date-format-converter',
          'timezone-converter',
          'http-header-parser',
          'htaccess-generator',
          'robots-txt-generator',
          'meta-tag-generator',
          'open-graph-preview',
          'password-generator',
          'random-token-generator',
          'uuid-generator',
          'uuid-validator',
          'jwt-decoder',
          'jwt-generator',
          'sha256-generator',
          'md5-generator',
          'checksum-generator',
          'json-formatter',
          'json-validator',
        ],
      }}
      toolGroups={[
        {
          title: 'Lookup and reference utilities',
          slugs: [
            'http-status-code-lookup',
            'port-number-lookup',
            'regex-cheatsheet-generator',
            'url-parser',
            'query-string-parser',
            'open-graph-preview',
          ],
        },
        {
          title: 'Security and identity helpers',
          slugs: [
            'password-strength-checker',
            'password-generator',
            'random-token-generator',
            'uuid-generator',
            'uuid-validator',
            'jwt-decoder',
            'jwt-generator',
            'sha256-generator',
          ],
        },
        {
          title: 'Time, web, and troubleshooting utilities',
          slugs: [
            'timestamp-converter',
            'unix-timestamp-converter',
            'date-format-converter',
            'timezone-converter',
            'http-header-parser',
            'htaccess-generator',
            'robots-txt-generator',
            'meta-tag-generator',
          ],
        },
      ]}
      useCases={[
        'Lookup HTTP status codes while triaging failed API requests.',
        'Generate and validate identifiers or tokens for test environments.',
        'Evaluate password policies and strength checks during auth updates.',
        'Convert timestamps and timezones while debugging scheduled jobs.',
        'Parse URLs and query strings to isolate malformed request parameters.',
      ]}
      conclusion={[
        'Developer utilities deliver outsized value because they eliminate repeated micro-delays across coding, debugging, and deployment workflows.',
        'This hub improves indexing by linking utility-focused search intent to concrete tool pages, category navigation, and related workflow hubs.',
        'Keep this page bookmarked as your daily quick-access index, then expand into JSON, regex, or encoding pages when a task needs deeper transformations.',
      ]}
      extraLinks={[
        { href: '/', label: 'Homepage' },
        { href: '/categories', label: 'Categories' },
        { href: '/free-developer-tools', label: 'Free Developer Tools' },
      ]}
    />
  );
}
