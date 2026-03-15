import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Regex Tester',
  description: 'Test regular expressions and highlight matches online.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
