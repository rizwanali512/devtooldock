import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSS Beautifier',
  description: 'Format and beautify CSS online.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
