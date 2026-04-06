import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/site-url';
import { DEFAULT_KEYWORDS } from '@/lib/seo';

export const metadata: Metadata = {
  title: '20 Best free AI Tools Online | use for Text, code, and image generation',
  description:
    'Discover the best AI tools online for coding, writing, design, and productivity. Use free AI tools to automate tasks, boost efficiency, and build smarter solutions.',
  keywords: `${DEFAULT_KEYWORDS}, ai code generator, sql generator, text generator`,
  alternates: { canonical: getBaseUrl() + '/ai-tools' },
  openGraph: {
    title: '20 Best free AI Tools Online | use for Text, code, and image generation',
    description:
      'Discover the best AI tools online for coding, writing, design, and productivity. Use free AI tools to automate tasks, boost efficiency, and build smarter solutions.',
    url: getBaseUrl() + '/ai-tools',
    type: 'website',
    siteName: 'DevToolDock',
  },
  twitter: {
    card: 'summary_large_image',
    title: '20 Best free AI Tools Online | use for Text, code, and image generation',
    description:
      'Discover the best AI tools online for coding, writing, design, and productivity. Use free AI tools to automate tasks, boost efficiency, and build smarter solutions.',
  },
};

export default function AIToolsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
