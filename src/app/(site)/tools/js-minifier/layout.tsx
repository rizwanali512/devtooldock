import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JS Minifier',
  description: 'Minify JavaScript online. Remove comments and whitespace.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
