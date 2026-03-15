import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Remove Duplicate Lines',
  description: 'Remove duplicate lines from text online.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
