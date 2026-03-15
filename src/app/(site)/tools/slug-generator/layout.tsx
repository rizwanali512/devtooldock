import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Slug Generator',
  description: 'Generate URL-friendly slugs from text.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

