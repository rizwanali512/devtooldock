import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sort Text Lines Online | Alphabetical and Custom Line Sorter',
  description:
    'Messy text list? Sort lines in seconds. Arrange data alphabetically, reverse order, or by length, clean duplicates, and organize content with this powerful tool.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
