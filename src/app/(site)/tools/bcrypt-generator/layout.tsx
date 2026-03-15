import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'bcrypt Generator',
  description: 'Generate bcrypt hashes for testing.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
