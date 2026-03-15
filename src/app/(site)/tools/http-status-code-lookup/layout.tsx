import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTTP Status Code Lookup',
  description: 'Look up HTTP status codes and their meanings.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
