import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Image to Base64 Converter Online | Encode Image to Base64',
  description:
    'Convert images to Base64 in seconds with our free online tool. Encode JPG, PNG, GIF, or SVG into Base64 strings or data URIs for HTML, CSS, and APIs. Fast and secure',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

