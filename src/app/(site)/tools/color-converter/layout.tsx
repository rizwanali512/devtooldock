import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Color Converter',
  description: 'Convert colors between HEX, RGB, and HSL formats.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

