import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sort Text Lines',
  description: 'Sort lines of text alphabetically online.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
