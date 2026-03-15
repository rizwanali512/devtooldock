import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'XML to JSON',
  description: 'Convert XML to JSON format online in your browser.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

