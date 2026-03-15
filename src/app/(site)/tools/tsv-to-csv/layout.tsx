import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TSV to CSV',
  description: 'Convert TSV (tab-separated values) to CSV online.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

