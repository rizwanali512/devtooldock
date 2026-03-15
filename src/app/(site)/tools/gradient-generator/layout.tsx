import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gradient Generator',
  description: 'Generate CSS gradients and preview them.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
