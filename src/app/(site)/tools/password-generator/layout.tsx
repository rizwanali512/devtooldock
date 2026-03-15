import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Password Generator',
  description: 'Generate secure random passwords online.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
