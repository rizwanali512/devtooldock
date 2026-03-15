import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSS Minifier',
  description: 'Minify CSS online. Remove comments and whitespace.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
