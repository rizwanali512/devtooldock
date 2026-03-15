import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UUID Generator',
  description: 'Generate UUID v4 online. Copy with one click.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
