import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cron Expression Generator',
  description: 'Generate a cron expression from common schedule fields.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

