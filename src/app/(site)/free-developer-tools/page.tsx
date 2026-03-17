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
        'When you’re building software, the fastest wins usually come from removing small bits of friction: formatting a payload, validating a token, decoding an encoded string, or generating a checksum. These are the kinds of tasks you do constantly—so having reliable tools in one place matters.',
        'DevToolDock is a collection of free, browser-based developer tools and AI utilities designed for daily work. This landing page highlights popular, high-leverage tools across categories like JSON, regex, encoding, and web utilities. Each tool links directly to its dedicated page so you can get work done in seconds.',
        'If you’re looking for a complete directory, jump to /tools or /all-tools, or browse by category to discover more specialized utilities.',
        'A good starting toolkit is small: one JSON tool, one regex tool, one encoding tool, and one security helper. Add converters and utilities as your projects demand. DevToolDock’s goal is to keep those essentials fast and consistent, so you can focus on shipping features instead of hunting for one-off websites.',
      ]}
      filter={{
        type: 'slugs',
        slugs: [
          'json-formatter',
          'json-validator',
          'json-minifier',
          'regex-tester',
          'base64-encoder',
          'base64-decoder',
          'jwt-decoder',
          'url-encoder',
          'url-decoder',
          'uuid-generator',
          'uuid-validator',
        ],
      }}
      useCases={[
        'Quickly format and validate API responses before debugging business logic.',
        'Test regex patterns with realistic text examples and verify flags.',
        'Encode/decode Base64 during token troubleshooting or data URL workflows.',
        'Decode JWTs to inspect claims like exp, aud, and iss during auth debugging.',
        'Parse and fix URL-encoded query strings and parameters.',
      ]}
      conclusion={[
        'A great developer toolkit is small, consistent, and always available. Start with a handful of essentials (JSON, regex, encoding) and add utilities as your workflow demands.',
        'DevToolDock keeps the basics fast and accessible, with deep coverage across categories—so you can spend more time shipping and less time searching for one-off utilities.',
        'If you share tools across a team, consider standardizing on a short list (formatter, validator, regex tester, Base64 tools). Consistency reduces context switching and helps everyone debug faster.',
      ]}
      extraLinks={[
        { href: '/categories', label: 'Categories' },
        { href: '/blog', label: 'SEO Blog Posts' },
      ]}
    />
  );
}

