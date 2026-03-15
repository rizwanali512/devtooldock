import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Text Reverser',
  description: 'Reverse text or strings character by character.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
