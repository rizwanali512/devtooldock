import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Base64 Encoder',
  description: 'Encode text to Base64 online. Free, runs in browser.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
