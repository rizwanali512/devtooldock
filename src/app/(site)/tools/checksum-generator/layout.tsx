import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checksum Generator',
  description: 'Generate SHA-256 and MD5 checksums for text.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
