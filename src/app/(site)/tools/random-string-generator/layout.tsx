import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Random String Generator',
  description: 'Generate random strings with configurable length and charset.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

