import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON to YAML',
  description: 'Convert JSON to YAML online in your browser.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

