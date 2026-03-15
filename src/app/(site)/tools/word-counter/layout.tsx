import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Word Counter',
  description: 'Count words, characters, and lines online.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
