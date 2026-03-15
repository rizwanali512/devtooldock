import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Random Token Generator',
  description: 'Generate secure random tokens for testing.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
