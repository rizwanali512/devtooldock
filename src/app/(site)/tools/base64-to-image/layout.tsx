import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Base64 to Image',
  description: 'Preview Base64 image data as an image online.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

