import type { Metadata } from 'next';
import { ToolsLandingPage } from '@/components/seo/ToolsLandingPage';
import { getBaseUrl } from '@/lib/site-url';
import { DEFAULT_KEYWORDS } from '@/lib/seo';

const path = '/online-developer-tools';
const canonical = getBaseUrl() + path;

export const metadata: Metadata = {
  title: 'Online Developer Tools | DevToolDock',
  description:
    'Online developer tools that run in your browser: format JSON, test regex, encode Base64, decode JWTs, and more. Fast and production-friendly.',
  keywords: `${DEFAULT_KEYWORDS}, online developer tools, browser tools, json tools, regex tools, encoding tools`,
  alternates: { canonical },
  openGraph: {
    title: 'Online Developer Tools | DevToolDock',
    description:
      'Online developer tools that run in your browser: format JSON, test regex, encode Base64, decode JWTs, and more. Fast and production-friendly.',
    url: canonical,
    type: 'website',
    siteName: 'DevToolDock',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online Developer Tools | DevToolDock',
    description:
      'Online developer tools that run in your browser: format JSON, test regex, encode Base64, decode JWTs, and more. Fast and production-friendly.',
  },
};

export default function OnlineDeveloperToolsPage() {
  return (
    <ToolsLandingPage
      h1="Online Developer Tools"
      intro={[
        'Online tools are at their best when they’re instant, predictable, and safe. In practice, that means quick load times, clear outputs, and minimal copy/paste overhead—especially when you’re debugging production issues or working through an incident.',
        'DevToolDock provides online developer tools that run in your browser for everyday tasks: JSON formatting and conversion, regex testing, Base64 encoding/decoding, URL utilities, and security helpers like JWT decoding. These tools are designed to help you move from “I see the problem” to “I fixed it” quickly.',
        'Use this page as an entry point, then explore the full directory on /tools and /all-tools to find specialized utilities.',
        'For SEO-focused workflows, it helps to think in “problem categories”: data formatting (JSON), text validation (regex), encoding (Base64/URL), and security debugging (JWT). DevToolDock groups tools by category so you can quickly jump to the right utility without scanning hundreds of unrelated results.',
      ]}
      filter={{
        type: 'mixed',
        categories: ['JSON Tools', 'Encoding Tools', 'Text Tools', 'Security Tools', 'URL Tools'],
        slugs: [],
      }}
      useCases={[
        'Investigate a broken integration by formatting a webhook payload and validating JSON.',
        'Diagnose authentication failures by decoding JWT claims (expiry, audience, issuer).',
        'Debug URL encoding issues in query strings and redirect URLs.',
        'Test regex validation rules before shipping them into production.',
        'Convert data between formats (JSON ↔ YAML/CSV/XML) for faster analysis and documentation.',
      ]}
      conclusion={[
        'A dependable set of online tools removes friction from the most common debugging tasks. With DevToolDock, you can keep your workflow in the browser and still get high-quality outputs.',
        'For more options, browse by category or jump directly to a specific tool from the list above.',
        'If you frequently share snippets with teammates, using consistent tools also makes collaboration easier: everyone sees the same formatted output and follows the same debugging steps.',
      ]}
      extraLinks={[
        { href: '/json-tools-online', label: 'JSON Tools' },
        { href: '/regex-tools', label: 'Regex Tools' },
        { href: '/base64-tools', label: 'Base64 Tools' },
      ]}
    />
  );
}

