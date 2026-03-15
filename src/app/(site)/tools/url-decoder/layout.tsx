import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'URL Decoder',
  description: 'Decode URL-encoded text online.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
