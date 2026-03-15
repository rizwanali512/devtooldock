import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Markdown to HTML',
  description: 'Convert Markdown to HTML.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
