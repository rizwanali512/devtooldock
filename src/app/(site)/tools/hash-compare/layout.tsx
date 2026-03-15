import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hash Compare',
  description: 'Compare text to a hash using common algorithms.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
