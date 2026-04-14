import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free URL Encoder Tool online | Encode URL and Parameters Easily',
  description:
    'Special characters breaking your URL? Encode URLs with our free tool. Convert spaces, symbols, and query parameters into safe format for APIs, forms, and web apps.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
