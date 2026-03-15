import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTML Decoder',
  description: 'Decode HTML entities to text online.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
