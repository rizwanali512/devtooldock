import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Port Number Lookup',
  description: 'Look up common TCP/UDP port numbers.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
