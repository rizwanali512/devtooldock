import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Favicon Generator',
  description: 'Generate a simple favicon from text or emoji.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
