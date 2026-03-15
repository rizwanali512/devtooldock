import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON to TypeScript Interface',
  description: 'Generate TypeScript interfaces from JSON.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
