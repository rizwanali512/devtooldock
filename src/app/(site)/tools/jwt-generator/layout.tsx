import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JWT Generator',
  description: 'Create a signed JWT (HS256) from header and payload.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
