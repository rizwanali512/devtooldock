import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Query String Parser',
  description: 'Parse URL query strings into key-value pairs.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
