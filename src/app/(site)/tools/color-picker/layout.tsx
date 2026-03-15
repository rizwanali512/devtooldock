import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Color Picker',
  description: 'Pick a color and copy values in multiple formats.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
