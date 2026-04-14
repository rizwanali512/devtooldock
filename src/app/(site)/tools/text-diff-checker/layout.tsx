import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best and free Text Diff Checker | Compare twoTexts online',
  description:
    'Compare text, code, or files with real-time diff results. Highlight changes, ignore whitespace, and analyze differences with precision using this fast browser-based tool.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
