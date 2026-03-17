import type { Metadata } from 'next';
import { ToolsLandingPage } from '@/components/seo/ToolsLandingPage';
import { getBaseUrl } from '@/lib/site-url';
import { DEFAULT_KEYWORDS } from '@/lib/seo';

const path = '/base64-tools';
const canonical = getBaseUrl() + path;

export const metadata: Metadata = {
  title: 'Base64 Tools | DevToolDock',
  description:
    'Free Base64 tools for developers: encode, decode, and convert images. Work with Base64 strings quickly and safely in your browser.',
  keywords: `${DEFAULT_KEYWORDS}, base64 tools, base64 encoder, base64 decoder, base64 image`,
  alternates: { canonical },
  openGraph: {
    title: 'Base64 Tools | DevToolDock',
    description:
      'Free Base64 tools for developers: encode, decode, and convert images. Work with Base64 strings quickly and safely in your browser.',
    url: canonical,
    type: 'website',
    siteName: 'DevToolDock',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Base64 Tools | DevToolDock',
    description:
      'Free Base64 tools for developers: encode, decode, and convert images. Work with Base64 strings quickly and safely in your browser.',
  },
};

export default function Base64ToolsLandingPage() {
  return (
    <ToolsLandingPage
      h1="Base64 Tools"
      intro={[
        'Base64 appears everywhere in developer workflows: tokens, data URLs, API payloads, and file conversions. It’s convenient because it turns bytes into text, but it can be hard to inspect quickly—especially when you’re dealing with long strings or embedded images.',
        'DevToolDock’s Base64 tools help you encode and decode strings, preview Base64 images, and convert images to data URLs. The goal is simple: make Base64 troubleshooting fast, predictable, and easy to copy into your code or tickets.',
        'Use the tools below to move between text, Base64 strings, and images without leaving your browser.',
        'Remember: Base64 is an encoding, not encryption. It’s great for transport and embedding, but you should never treat it as secret. These tools are designed for debugging and day-to-day developer workflows, so you can quickly verify what a string contains and convert it into the format you need.',
      ]}
      filter={{
        type: 'mixed',
        categories: ['Encoding Tools', 'File Converters'],
        slugs: ['base64-encoder', 'base64-decoder', 'base64-to-image', 'image-to-base64'],
      }}
      useCases={[
        'Encode a string to Base64 for test fixtures or API payloads.',
        'Decode a Base64 string to quickly verify what a token segment contains.',
        'Convert an image to a Base64 data URL for HTML/CSS prototypes.',
        'Preview a Base64 image string to verify it isn’t corrupted.',
        'Troubleshoot JWT payloads by decoding Base64url segments (pair with /jwt-decoder).',
      ]}
      conclusion={[
        'Base64 is an encoding, not encryption—decode it freely for debugging, but never assume it hides sensitive data. When working with tokens or auth flows, pair Base64 utilities with the JWT tools.',
        'For more conversions and utilities, explore the broader catalog on /tools and /all-tools.',
        'If you deal with Base64 often, bookmark the encoder/decoder and the image converters. That covers most real-world cases: token inspection, data URLs, and quick previews during debugging.',
      ]}
      extraLinks={[
        { href: '/encoding-tools', label: 'Encoding Tools' },
        { href: '/how-to-decode-jwt-tokens', label: 'JWT Guide' },
      ]}
    />
  );
}

