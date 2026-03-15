import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'YAML to JSON',
  description: 'Convert YAML to JSON online in your browser.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

