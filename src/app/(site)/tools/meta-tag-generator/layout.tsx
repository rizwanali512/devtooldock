import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meta Tag Generator',
  description: 'Generate common SEO and social meta tags for a page.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

