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
        'JSON is the default data format for APIs, webhooks, configuration files, and many developer workflows. But raw JSON can be hard to read, easy to break, and time-consuming to debug—especially when it’s minified or deeply nested.',
        'DevToolDock’s JSON tools help you format, validate, minify, and convert JSON without leaving your browser. Whether you’re cleaning up an API response, preparing examples for documentation, or transforming data for a spreadsheet, these tools are built to be fast and developer-friendly.',
        'On this page you’ll find the most useful JSON utilities—plus quick internal links to the full directory on /tools and /all-tools so you can discover more.',
        'If you regularly work with REST APIs, GraphQL responses, or event payloads, the fastest debugging move is to make the data readable first. Once JSON is formatted and valid, you can verify structure, compare versions, and transform it into other formats (CSV/YAML/XML) without rewriting scripts or switching tools.',
      ]}
      filter={{ type: 'mixed', categories: ['json', 'file-converters'], slugs: [] }}
      useCases={[
        'Beautify a minified API response so you can quickly inspect nested fields and arrays.',
        'Validate JSON before committing fixtures or sending payloads to an endpoint.',
        'Minify JSON to reduce payload size when storing or transmitting data.',
        'Convert JSON to CSV for quick analysis in spreadsheets or BI tools.',
        'Convert JSON to YAML for configuration (CI, Docker, Kubernetes, app settings).',
      ]}
      conclusion={[
        'A simple JSON workflow is: validate → format → transform. Start with the JSON Formatter when you need readability, and switch to the JSON Validator when you only need strict correctness.',
        'When you’re ready to explore beyond JSON, browse DevToolDock’s full directory and categories to build a compact, reliable toolbelt for everyday development.',
        'Pro tip: keep a small set of “daily drivers” bookmarked—formatter, validator, minifier, and one converter. That covers most real-world payload work and keeps your workflow consistent across projects and teams.',
      ]}
      extraLinks={[
        { href: '/categories', label: 'Browse Categories' },
        { href: '/blog', label: 'Read the Blog' },
      ]}
    />
  );
}
