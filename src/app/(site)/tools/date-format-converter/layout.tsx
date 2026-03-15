import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Date Format Converter',
  description: 'Convert dates between common formats.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
