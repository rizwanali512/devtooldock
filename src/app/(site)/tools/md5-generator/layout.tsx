import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MD5 Generator',
  description: 'Compute MD5 hash of text online. For non-security use only.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
