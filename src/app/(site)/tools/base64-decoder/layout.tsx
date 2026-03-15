import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Base64 Decoder',
  description: 'Decode Base64 to text online. Free, runs in browser.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
