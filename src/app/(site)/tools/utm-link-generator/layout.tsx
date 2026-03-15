import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UTM Link Generator',
  description: 'Add UTM parameters to URLs for tracking.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
