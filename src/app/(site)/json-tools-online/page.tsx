import type { Metadata } from 'next';
import { ToolsLandingPage } from '@/components/seo/ToolsLandingPage';
import { getBaseUrl } from '@/lib/site-url';
import { DEFAULT_KEYWORDS } from '@/lib/seo';

const path = '/json-tools-online';
const canonical = getBaseUrl() + path;

export const metadata: Metadata = {
  title: 'JSON Tools Online | DevToolDock',
  description:
    'Explore free JSON tools online: formatter, validator, minifier, and converters. Clean, validate, and transform JSON instantly in your browser.',
  keywords: `${DEFAULT_KEYWORDS}, json tools online, json formatter, json validator, json minifier`,
  alternates: { canonical },
  openGraph: {
    title: 'JSON Tools Online | DevToolDock',
    description:
      'Explore free JSON tools online: formatter, validator, minifier, and converters. Clean, validate, and transform JSON instantly in your browser.',
    url: canonical,
    type: 'website',
    siteName: 'DevToolDock',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Tools Online | DevToolDock',
    description:
      'Explore free JSON tools online: formatter, validator, minifier, and converters. Clean, validate, and transform JSON instantly in your browser.',
  },
};

export default function JsonToolsOnlinePage() {
  return (
    <ToolsLandingPage
      h1="JSON Tools Online"
      intro={[
        'JSON tools online are essential for modern API development because nearly every workflow depends on reading, validating, transforming, and sharing JSON payloads. When responses are minified, malformed, or deeply nested, debugging slows down fast. This hub centralizes high-intent JSON utilities with direct links so both developers and search engines can move from broad queries like "JSON formatter online" to specific operations such as validation, diffing, and conversion.',
        'DevToolDock includes practical browser-based JSON utilities for daily engineering work: formatters, validators, minifiers, and converters between JSON, CSV, XML, and YAML. You can normalize payloads before code review, generate quick test fixtures, prepare data for spreadsheet analysis, and compare object structures during incident response. Because every tool is linked through category and workflow context, this page also improves crawlability for long-tail JSON search terms.',
        'For teams shipping APIs, a repeatable JSON process is simple and reliable: validate structure first, format for readability, compare revisions, then convert as needed for downstream systems. This landing page supports that flow with grouped internal links and related categories. If your task expands into token inspection, URL parsing, or encoding checks, you can jump directly to connected tools without losing context.',
        'Use this page as an SEO and productivity hub for JSON tooling. It maps common developer intent to concrete actions and keeps internal linking dense enough to support indexing at scale. Start with the JSON formatter, move to validators and diffing when debugging, and use converters when handing data to analytics, automation, or documentation pipelines.',
      ]}
      filter={{
        type: 'slugs',
        slugs: [
          'json-formatter',
          'json-validator',
          'json-pretty-print',
          'json-minifier',
          'json-diff-viewer',
          'json-to-csv',
          'csv-to-json',
          'json-to-xml',
          'xml-to-json',
          'json-to-yaml',
          'yaml-to-json',
          'json-to-typescript-interface',
          'csv-to-tsv',
          'tsv-to-csv',
          'markdown-to-html',
          'html-to-markdown',
          'query-string-parser',
          'regex-tester',
          'base64-encoder',
          'base64-decoder',
          'url-encoder',
          'url-decoder',
        ],
      }}
      toolGroups={[
        {
          title: 'Core JSON editing and validation',
          slugs: [
            'json-formatter',
            'json-validator',
            'json-pretty-print',
            'json-minifier',
            'json-diff-viewer',
            'json-to-typescript-interface',
          ],
        },
        {
          title: 'JSON conversion workflows',
          slugs: [
            'json-to-csv',
            'csv-to-json',
            'json-to-xml',
            'xml-to-json',
            'json-to-yaml',
            'yaml-to-json',
            'csv-to-tsv',
            'tsv-to-csv',
          ],
        },
        {
          title: 'Related parsing and transport helpers',
          slugs: [
            'query-string-parser',
            'url-encoder',
            'url-decoder',
            'base64-encoder',
            'base64-decoder',
            'regex-tester',
          ],
        },
      ]}
      useCases={[
        'Beautify a minified API response so you can quickly inspect nested fields and arrays.',
        'Validate JSON before committing fixtures or sending payloads to an endpoint.',
        'Minify JSON to reduce payload size when storing or transmitting data.',
        'Convert JSON to CSV for quick analysis in spreadsheets or BI tools.',
        'Convert JSON to YAML for configuration (CI, Docker, Kubernetes, app settings).',
      ]}
      conclusion={[
        'Strong JSON workflows are built on consistent steps and clear internal linking: validate, format, compare, convert, and then move to adjacent tooling only when needed.',
        'This hub helps search crawlers discover JSON-intent pages while helping developers jump quickly between payload cleanup, schema checks, and cross-format exports.',
        'Keep your daily set small and dependable: formatter, validator, minifier, diff viewer, and one converter. That combination handles most production payload debugging with minimal context switching.',
      ]}
      extraLinks={[
        { href: '/', label: 'Homepage' },
        { href: '/categories', label: 'Browse Categories' },
        { href: '/blog', label: 'Read the Blog' },
      ]}
    />
  );
}
