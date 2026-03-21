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
        'Encoding is a daily part of modern development. You encode data to make it safe for transport, embed it inside text-based formats, or preserve special characters across systems. When you’re debugging, the ability to encode and decode quickly can save a surprising amount of time.',
        'DevToolDock’s encoding tools cover the most common workflows: Base64, URL encoding, and HTML entity conversion. These utilities run in your browser and are designed for fast iteration—copy in, convert, copy out.',
        'Use the tool list below to jump to a specific converter, then explore related categories for JSON and security helpers.',
        'Encoding issues usually show up as “weird characters,” broken redirects, or blobs that are impossible to read. Having a dedicated set of encoding tools makes it easy to confirm what data actually looks like at each step (before/after transport), which is especially useful when multiple services are involved.',
      ]}
      filter={{
        type: 'mixed',
        categories: ['encoding', 'url'],
        slugs: [],
      }}
      useCases={[
        'Base64 encode/decode strings when working with tokens, payloads, or fixtures.',
        'URL-encode query string values and decode them when debugging redirects.',
        'Encode HTML entities to safely display user-provided text in markup.',
        'Decode HTML entities when copying content from rendered pages back into source.',
        'Pair encoding utilities with JSON tools when working with API payloads.',
      ]}
      conclusion={[
        'Encoding problems are usually small but high-impact—broken URLs, corrupted payloads, or unreadable blobs. Keep encoding tools close to your workflow and you’ll debug faster.',
        'For deeper debugging, jump to /json-tools-online and /base64-tools, or browse the full directory on /all-tools.',
        'If you frequently work with auth tokens and signatures, pair encoding tools with security utilities like the JWT decoder so you can inspect claims and payloads without manual conversions.',
      ]}
      extraLinks={[
        { href: '/base64-tools', label: 'Base64 Tools' },
        { href: '/json-tools-online', label: 'JSON Tools' },
      ]}
    />
  );
}

