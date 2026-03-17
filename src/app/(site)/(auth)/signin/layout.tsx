import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/site-url';

export const metadata: Metadata = {
  title: 'Sign In',
  alternates: { canonical: getBaseUrl() + '/signin' },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: PropsWithChildren) {
  return children;
}
