import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image to Base64',
  description: 'Convert an image file to Base64 (data URL) online.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

