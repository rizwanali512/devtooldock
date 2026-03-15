import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Converter',
  description: 'Convert text into camelCase, snake_case, kebab-case, and more.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

