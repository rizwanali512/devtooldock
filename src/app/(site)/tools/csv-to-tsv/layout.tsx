import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSV to TSV',
  description: 'Convert CSV to TSV (tab-separated values) online.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

