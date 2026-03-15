import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unix Timestamp Converter',
  description: 'Convert Unix timestamps (seconds) to human-readable date/time and back.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

