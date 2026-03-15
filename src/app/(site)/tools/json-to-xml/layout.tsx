import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON to XML',
  description: 'Convert JSON to XML format online.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
