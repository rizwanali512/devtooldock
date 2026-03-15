import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON to CSV',
  description: 'Convert JSON array to CSV format online.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
