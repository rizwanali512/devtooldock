import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Password Strength Checker',
  description: 'Check password strength and get feedback.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
