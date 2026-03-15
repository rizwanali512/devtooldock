import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Robots.txt Generator',
  description: 'Generate a robots.txt file for your website.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

