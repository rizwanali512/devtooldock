import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON Diff Viewer',
  description: 'Compare two JSON objects and see differences.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

