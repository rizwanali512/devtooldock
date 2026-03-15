import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSS Shadow Generator',
  description: 'Generate CSS box-shadow values with preview.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
