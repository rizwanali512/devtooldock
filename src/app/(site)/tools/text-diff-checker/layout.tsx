import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Text Diff Checker',
  description: 'Compare two texts and see differences online.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
