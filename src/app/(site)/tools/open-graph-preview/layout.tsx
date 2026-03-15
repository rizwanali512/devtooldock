import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Open Graph Preview',
  description: 'Preview how Open Graph meta tags render as a card.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
