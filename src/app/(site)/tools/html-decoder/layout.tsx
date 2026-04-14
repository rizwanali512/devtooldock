import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best HTML Decoder Online | Decode HTML to Readable Text',
  description:
    'Decode HTML online for free. Fast, secure, and easy tool to convert encoded HTML entities into readable text in seconds.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
