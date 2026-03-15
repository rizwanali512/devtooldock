import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/site-url';
import { DEFAULT_KEYWORDS } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Developer Tools',
  description:
    'Free, fast developer tools. Format JSON, encode Base64, test regex, generate UUIDs, convert files, and more. All tools run in your browser.',
  keywords: DEFAULT_KEYWORDS,
  alternates: { canonical: getBaseUrl() + '/tools' },
  openGraph: {
    title: 'Developer Tools – Free Online Utilities',
    description:
      'Free, fast developer tools. Format JSON, encode Base64, test regex, generate UUIDs, convert files, and more. All tools run in your browser.',
    url: getBaseUrl() + '/tools',
    type: 'website',
    siteName: 'DevToolDock',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Developer Tools – Free Online Utilities',
    description:
      'Free, fast developer tools. Format JSON, encode Base64, test regex, generate UUIDs, and more. All tools run in your browser.',
  },
};

export default function ToolsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
