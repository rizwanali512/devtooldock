import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HEX to RGB',
  description: 'Convert HEX color codes to RGB values.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

