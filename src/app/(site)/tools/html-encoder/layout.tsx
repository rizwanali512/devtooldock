import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTML Encoder',
  description: 'Encode text to HTML entities online.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
