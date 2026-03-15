import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Htaccess Generator',
  description: 'Generate common .htaccess snippets.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
