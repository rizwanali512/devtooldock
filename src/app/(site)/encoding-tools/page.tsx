import type { Metadata } from 'next';
import { ToolsLandingPage } from '@/components/seo/ToolsLandingPage';
import { getBaseUrl } from '@/lib/site-url';
import { DEFAULT_KEYWORDS } from '@/lib/seo';

const path = '/encoding-tools';
const canonical = getBaseUrl() + path;

export const metadata: Metadata = {
  title: 'Encoding Tools | DevToolDock',
  description:
    'Encoding tools for developers: Base64 encode/decode, HTML entity encoding, and URL encoding utilities. Convert data safely for transport and storage.',
  keywords: `${DEFAULT_KEYWORDS}, encoding tools, base64 tools, url encoding, html entity encoder`,
  alternates: { canonical },
  openGraph: {
    title: 'Encoding Tools | DevToolDock',
    description:
      'Encoding tools for developers: Base64 encode/decode, HTML entity encoding, and URL encoding utilities. Convert data safely for transport and storage.',
    url: canonical,
    type: 'website',
    siteName: 'DevToolDock',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Encoding Tools | DevToolDock',
    description:
      'Encoding tools for developers: Base64 encode/decode, HTML entity encoding, and URL encoding utilities. Convert data safely for transport and storage.',
  },
};

export default function EncodingToolsPage() {
  return (
    <ToolsLandingPage
      h1="Encoding Tools"
      intro={[
        'Encoding tools are foundational for safe data transport, browser interoperability, and debugging across distributed systems. Developers constantly move data through URLs, headers, HTML templates, tokens, and JSON payloads, and each step can introduce escaped characters or transformed values. This page serves as an SEO-focused hub for encoding utilities, helping users and crawlers discover conversion tools quickly through strong internal linking.',
        'DevToolDock includes practical online encoding tools for Base64, URL encoding, HTML entities, and related conversion workflows. You can decode unreadable payloads, verify if redirect parameters are correctly escaped, convert images to and from Base64, and inspect token fragments during authentication troubleshooting. These tools are intentionally grouped by workflow so you can move from a single conversion task to adjacent checks without context switching.',
        'When debugging integration issues, encoding mistakes often appear as broken redirects, invalid signatures, corrupted metadata, or unreadable logs. A repeatable process is to decode first for visibility, validate structure, apply precise re-encoding, and retest the full request path. This landing page supports that flow by linking encoding tools with JSON, URL, and security helpers that commonly appear in the same troubleshooting session.',
        'Use this index as your central route for encoding and decoding tasks in web and API projects. It improves crawlability by connecting high-intent keyword pages while giving engineers a fast, practical launchpad. For deeper workflows, continue to categories, homepage navigation, and focused hubs like JSON tools online and developer utilities.',
      ]}
      filter={{
        type: 'mixed',
        categories: ['encoding', 'url', 'file-converters'],
        slugs: [
          'jwt-decoder',
          'jwt-generator',
          'query-string-parser',
          'url-parser',
          'json-formatter',
          'json-validator',
          'checksum-generator',
          'sha256-generator',
        ],
      }}
      toolGroups={[
        {
          title: 'Core encoding and decoding',
          slugs: [
            'base64-encoder',
            'base64-decoder',
            'url-encoder',
            'url-decoder',
            'html-encoder',
            'html-decoder',
          ],
        },
        {
          title: 'Transport and file conversion helpers',
          slugs: [
            'image-to-base64',
            'base64-to-image',
            'query-string-parser',
            'url-parser',
            'json-to-xml',
            'xml-to-json',
            'json-to-yaml',
            'yaml-to-json',
          ],
        },
        {
          title: 'Security and payload checks',
          slugs: [
            'jwt-decoder',
            'jwt-generator',
            'json-formatter',
            'json-validator',
            'sha256-generator',
            'checksum-generator',
          ],
        },
      ]}
      useCases={[
        'Base64 encode/decode strings when working with tokens, payloads, or fixtures.',
        'URL-encode query string values and decode them when debugging redirects.',
        'Encode HTML entities to safely display user-provided text in markup.',
        'Decode HTML entities when copying content from rendered pages back into source.',
        'Pair encoding utilities with JSON tools when working with API payloads.',
      ]}
      conclusion={[
        'Encoding bugs are often small in code but large in impact. A compact set of decode, validate, and re-encode tools saves significant debugging time in API and frontend pipelines.',
        'This page strengthens indexing by linking conversion intent to related parsing and security pages, giving crawlers a clearer map of the site’s technical coverage.',
        'For daily work, bookmark Base64, URL, and HTML encoding tools plus one JSON validator. That combination handles most real-world payload and transport problems.',
      ]}
      extraLinks={[
        { href: '/', label: 'Homepage' },
        { href: '/categories', label: 'Categories' },
        { href: '/base64-tools', label: 'Base64 Tools' },
        { href: '/json-tools-online', label: 'JSON Tools' },
      ]}
    />
  );
}

