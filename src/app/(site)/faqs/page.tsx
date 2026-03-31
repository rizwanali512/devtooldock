import type { Metadata } from 'next';
import Link from 'next/link';
import { getBaseUrl } from '@/lib/site-url';

export const revalidate = 86400;

const canonical = `${getBaseUrl()}/faqs`;

export const metadata: Metadata = {
  title: 'FAQs | DevToolDock',
  description:
    'Frequently asked questions about DevToolDock tools, AI utilities, and legal generators.',
  alternates: { canonical },
};

const cardClass =
  'bg-white p-6 sm:p-9 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)]';

export default function FaqsPage() {
  return (
    <div className="wrapper py-14 md:py-28">
      <div className="max-w-5xl mx-auto w-full space-y-6">
        <div className="text-center">
          <h1 className="mb-2 font-bold text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
            FAQs
          </h1>
          <p className="text-gray-500 dark:text-gray-400 leading-6">
            Quick answers about DevToolDock tools and how to use them.
          </p>
        </div>

        <div className={cardClass}>
          <div className="space-y-5 text-gray-500 dark:text-gray-400 leading-7">
            <div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-white/90">
                Are the tools free?
              </h2>
              <p className="mt-1">
                Yes—DevToolDock provides free online developer tools and utilities. Some AI
                features require configuring an API key for your deployment.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-white/90">
                Where can I browse all tools?
              </h2>
              <p className="mt-1">
                Use{' '}
                <Link href="/all-tools" className="text-primary-500 underline font-medium">
                  All Tools
                </Link>{' '}
                to see the full directory, or{' '}
                <Link href="/categories" className="text-primary-500 underline font-medium">
                  Categories
                </Link>{' '}
                to browse by type.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-white/90">
                Where are AI tools?
              </h2>
              <p className="mt-1">
                You can find AI utilities under{' '}
                <Link href="/ai-tools" className="text-primary-500 underline font-medium">
                  AI Tools
                </Link>
                .
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-white/90">
                Where are legal generators?
              </h2>
              <p className="mt-1">
                Visit{' '}
                <Link href="/legal-tools" className="text-primary-500 underline font-medium">
                  Legal Tools
                </Link>{' '}
                to browse all generators.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-white/90">
                Need help or found a bug?
              </h2>
              <p className="mt-1">
                Reach out via{' '}
                <Link href="/contact" className="text-primary-500 underline font-medium">
                  Contact Us
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

