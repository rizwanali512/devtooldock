import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Timestamp Converter',
  description: 'Convert ISO date/time ↔ Unix timestamps (ms and seconds).',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

