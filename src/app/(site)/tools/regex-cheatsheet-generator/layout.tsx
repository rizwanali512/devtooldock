import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Regex Cheatsheet',
  description: 'Quick regex syntax cheatsheet for developers.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
