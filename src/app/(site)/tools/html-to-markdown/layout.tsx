import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTML to Markdown',
  description: 'Convert HTML to Markdown.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
