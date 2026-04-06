import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/site-url';
import { DEFAULT_KEYWORDS } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Free Developer Tools online | JSON, Text, and File converters',
  description:
    'Explore powerful developer tools including JSON tools, file converters, encoding tools, URL utilities, security tools, text tools, and more. Fast, free, and easy-to-use.',
  keywords: DEFAULT_KEYWORDS,
  alternates: { canonical: getBaseUrl() + '/tools' },
  openGraph: {
    title: 'Free Developer Tools online | JSON, Text, and File converters',
    description:
      'Explore powerful developer tools including JSON tools, file converters, encoding tools, URL utilities, security tools, text tools, and more. Fast, free, and easy-to-use.',
    url: getBaseUrl() + '/tools',
    type: 'website',
    siteName: 'DevToolDock',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Developer Tools online | JSON, Text, and File converters',
    description:
      'Explore powerful developer tools including JSON tools, file converters, encoding tools, URL utilities, security tools, text tools, and more. Fast, free, and easy-to-use.',
  },
};

export default function ToolsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
