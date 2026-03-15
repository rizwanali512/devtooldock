import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON Formatter',
  description: 'Format and beautify JSON online. Validate JSON and get clear error messages.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
