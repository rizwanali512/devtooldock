import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UUID Validator',
  description: 'Validate UUID strings (v1–v5) online in your browser.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

