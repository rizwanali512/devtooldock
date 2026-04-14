import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best UUID Generator Online | Generate UUID v4 and v1',
  description:
    'Generate UUIDs online for free. Fast, secure, and reliable tool to create unique identifiers for development, testing, and data management.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
