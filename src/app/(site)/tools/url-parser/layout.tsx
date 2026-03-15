import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'URL Parser',
  description: 'Parse a URL into protocol, host, path, and query params.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

