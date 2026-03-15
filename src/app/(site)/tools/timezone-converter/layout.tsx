import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Timezone Converter',
  description: 'Convert a date/time between common timezones.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
