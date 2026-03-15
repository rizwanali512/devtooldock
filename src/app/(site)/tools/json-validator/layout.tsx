import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON Validator',
  description: 'Validate JSON syntax online. Get clear error messages and line information.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
