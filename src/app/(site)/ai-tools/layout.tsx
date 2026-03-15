import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/site-url';
import { DEFAULT_KEYWORDS } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'AI Tools',
  description:
    'AI-powered developer tools: code generation, SQL queries, text generation, commit messages, API docs, and more. Improve productivity with AI utilities.',
  keywords: `${DEFAULT_KEYWORDS}, ai code generator, sql generator, text generator`,
  alternates: { canonical: getBaseUrl() + '/ai-tools' },
  openGraph: {
    title: 'AI Developer Tools – Code, SQL, Docs & More',
    description:
      'AI-powered developer tools: code generation, SQL queries, text generation, commit messages, API docs, and more. Improve productivity with AI utilities.',
    url: getBaseUrl() + '/ai-tools',
    type: 'website',
    siteName: 'DevToolDock',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Developer Tools – Code, SQL, Docs & More',
    description:
      'AI-powered developer tools: code generation, SQL queries, text generation, and more. Improve productivity with AI utilities.',
  },
};

export default function AIToolsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
