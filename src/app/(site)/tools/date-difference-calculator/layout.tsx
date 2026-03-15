import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Date Difference Calculator',
  description: 'Calculate the difference between two dates and times.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

