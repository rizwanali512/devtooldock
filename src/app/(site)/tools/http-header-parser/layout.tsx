import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTTP Header Parser',
  description: 'Parse raw HTTP headers into a structured JSON object.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

