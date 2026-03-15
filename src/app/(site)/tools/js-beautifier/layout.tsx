import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JS Beautifier',
  description: 'Format and beautify JavaScript online.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
