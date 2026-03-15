import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SHA256 Generator',
  description: 'Compute SHA-256 hash of text online. Free, runs in browser.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
