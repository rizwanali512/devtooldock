import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Converter Online | Uppercase, Lowercase and Title Case',
  description:
    'Need to change text case? Convert uppercase, lowercase, title case, and sentence case in seconds. Clean and format text with this fast and easy tool.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

