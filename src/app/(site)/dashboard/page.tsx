import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/site-url';

export const metadata: Metadata = {
  title: 'Dashboard',
  alternates: { canonical: getBaseUrl() + '/dashboard' },
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return (
    <div className="wrapper py-14 md:py-28">
      <h1 className="font-bold text-center text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
        Dashboard
      </h1>
      <p className="mt-4 text-center text-gray-500 dark:text-gray-400">
        Coming soon.
      </p>
    </div>
  );
}
