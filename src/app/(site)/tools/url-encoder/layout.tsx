import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'URL Encoder',
  description: 'Encode text for URLs (percent-encoding) online.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
