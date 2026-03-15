import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSV to JSON',
  description: 'Convert CSV to JSON array online.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
