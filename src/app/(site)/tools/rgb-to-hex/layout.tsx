import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RGB to HEX',
  description: 'Convert RGB color values to HEX codes.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
