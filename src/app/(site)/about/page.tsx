import type { Metadata } from 'next';
import Link from 'next/link';
import { getBaseUrl } from '@/lib/site-url';
import { DEFAULT_KEYWORDS } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'About Us | Free Developer Tools and AI Tools Platform',
  description:
    'Learn about our mission to provide free developer tools and AI-powered utilities. We help developers build faster with easy-to-use tools for coding, automation, and productivity.',
  keywords: DEFAULT_KEYWORDS,
  alternates: { canonical: getBaseUrl() + '/about' },
  openGraph: {
    title: 'About Us | Free Developer Tools and AI Tools Platform',
    description:
      'Learn about our mission to provide free developer tools and AI-powered utilities. We help developers build faster with easy-to-use tools for coding, automation, and productivity.',
    url: getBaseUrl() + '/about',
    type: 'website',
    siteName: 'DevToolDock',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Free Developer Tools and AI Tools Platform',
    description:
      'Learn about our mission to provide free developer tools and AI-powered utilities. We help developers build faster with easy-to-use tools for coding, automation, and productivity.',
  },
};

export default function AboutPage() {
  return (
    <div className="wrapper py-14 md:py-28">
      <div className="max-w-3xl mx-auto">
        <h1 className="mb-4 font-bold text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
          About DevToolDock
        </h1>
        <p className="mb-10 text-lg text-gray-600 dark:text-gray-300">
          DevToolDock is a collection of free developer tools and AI-powered utilities designed to help developers work faster. The platform includes JSON tools, encoding utilities, regex testers, file converters, and AI tools for generating code and automation tasks.
        </p>

        <div className="space-y-10 text-gray-600 dark:text-gray-300 leading-6">
          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              Our mission
            </h2>
            <p>
              Our goal is to give developers and teams instant access to
              essential utilities: JSON formatting and validation, Base64
              encode/decode, regex testing, UUID and password generation, timestamps,
              color converters, and dozens more. Everything runs in your
              browser—no sign-up, no tracking, no cost.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              What we offer
            </h2>
            <p className="mb-4">
              We provide a growing collection of developer tools and AI-powered
              utilities:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <strong className="text-gray-800 dark:text-white/90">
                  Developer tools
                </strong>{' '}
                — JSON formatter, validators, encoders/decoders, hashing, JWT
                tools, regex tester, and many more for data and code.
              </li>
              <li>
                <strong className="text-gray-800 dark:text-white/90">
                  AI utilities
                </strong>{' '}
                — Code generation, SQL helpers, and automation aids to speed up
                your workflow.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              Why choose us
            </h2>
            <p>
              Our tools are built to be fast, reliable, and private. We keep the
              interface simple and the results accurate. Whether you&apos;re
              debugging JSON, generating secure tokens, or converting data
              formats, you get a no-fuss experience with no account required.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              Get in touch
            </h2>
            <p className="mb-4">
              Have feedback, ideas for new tools, or questions? We&apos;d love to
              hear from you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/tools"
                className="inline-flex items-center justify-center h-12 px-6 rounded-full font-medium text-sm bg-primary-500 hover:bg-primary-600 text-white transition"
              >
                Browse all tools
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-12 px-6 rounded-full font-medium text-sm border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white/90 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
              >
                Contact us
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
