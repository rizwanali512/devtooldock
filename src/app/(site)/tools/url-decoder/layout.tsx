import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best URL Decoder Online | Free Decode URL Encoding Easily',
  description:
    'Confusing encoded URLs? Decode URL strings in seconds. Convert %20, %3D, and other codes into readable text for APIs, forms, and web debugging.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
