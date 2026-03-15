import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Random Text Generator',
  description: 'Generate random paragraphs or words for placeholders.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
