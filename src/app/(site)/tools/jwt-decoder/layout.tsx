import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JWT Decoder',
  description: 'Decode JWT tokens and view header and payload online.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
