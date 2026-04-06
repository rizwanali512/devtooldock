import type { Metadata } from 'next';
import BenefitsGrid from '@/components/sections/benefits-grid';
import TestimonialsSection from '@/components/sections/client-testimonial';
import FaqAccordion from '@/components/sections/faq-accordion';
import HeroSection from '@/components/sections/hero-section';
import ToolsTab from '@/components/sections/tools-tab';
import { CoreFeatures } from '@/components/sections/core-features';
import PricingSection from '@/components/sections/pricing';
import { PopularTools } from '@/components/tools/PopularTools';
import { RecentlyUsedTools } from '@/components/tools/RecentlyUsedTools';
import { getBaseUrl } from '@/lib/site-url';
import { features } from '@/config/features';
import { DEFAULT_KEYWORDS } from '@/lib/seo';
import Link from 'next/link';
import { aiTools } from '@/lib/ai-tools';
import { blogs } from '@/lib/blogs';
import { getTopTools } from '@/lib/tools';
import { CATEGORY_META } from '@/lib/categories';

export const metadata: Metadata = {
  title: 'Best AI Tools for Coding | Free AI coding assistants for developers',
  description:
    'Use the best AI tools for coding, including 20 free AI coding assistants for developers. Boost productivity, write cleaner code, and build faster with top AI-powered tools designed for modern programmers.',
  keywords: DEFAULT_KEYWORDS,
  alternates: { canonical: getBaseUrl() + '/' },
  openGraph: {
    title: 'Best AI Tools for Coding | Free AI coding assistants for developers',
    description:
      'Use the best AI tools for coding, including 20 free AI coding assistants for developers. Boost productivity, write cleaner code, and build faster with top AI-powered tools designed for modern programmers.',
    url: getBaseUrl() + '/',
    type: 'website',
    siteName: 'DevToolDock',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools for Coding | Free AI coding assistants for developers',
    description:
      'Use the best AI tools for coding, including 20 free AI coding assistants for developers. Boost productivity, write cleaner code, and build faster with top AI-powered tools designed for modern programmers.',
  },
};

const cardClass =
  'bg-white p-6 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)] hover:border-primary-200 dark:hover:border-primary-500/30 transition flex flex-col';

export default async function Home() {
  const topTools = getTopTools();
  const topAi = aiTools.slice(0, 6);
  const topBlogs = [...blogs]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 6);

  return (
    <>
      <HeroSection />
      <CoreFeatures />
      {features.homepageToolsTabEnabled && <ToolsTab />}
      <BenefitsGrid />
      <TestimonialsSection />
      {features.pricingEnabled && <PricingSection />}
      <section className="wrapper py-14 md:py-28">
        <RecentlyUsedTools />

        <div className="max-w-5xl mx-auto w-full">
          <div className="flex items-end justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white/90">
              Top tools
            </h2>
            <Link
              href="/tools"
              className="text-sm font-medium text-primary-700 hover:text-primary-800 hover:underline"
            >
              Browse all tools
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topTools.map((t) => (
              <div key={t.slug} className={cardClass}>
                <h3 className="mb-2 text-lg font-bold text-gray-800 dark:text-white/90">
                  {t.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-6 flex-1">
                  {t.description}
                </p>
                <Link
                  href={t.href}
                  className="mt-4 inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition w-fit"
                >
                  Open tool
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 md:mt-18 max-w-5xl mx-auto w-full">
          <PopularTools />
        </div>

        <div className="mt-14 md:mt-18 max-w-5xl mx-auto w-full">
          <div className="flex items-end justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white/90">
              Popular Developer Tools
            </h2>
            <Link
              href="/free-developer-tools"
              className="text-sm font-medium text-primary-700 hover:text-primary-800 hover:underline"
            >
              Explore tool hubs
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                href: '/free-developer-tools',
                title: 'Free Developer Tools',
                description:
                  'A broad hub linking top free online coding utilities and debugging tools.',
              },
              {
                href: '/json-tools-online',
                title: 'JSON Tools Online',
                description:
                  'Formatter, validator, minifier, diff, and converters for JSON workflows.',
              },
              {
                href: '/regex-tools',
                title: 'Regex Tools',
                description:
                  'Tester, generator, explainer, and text utilities for regex debugging.',
              },
              {
                href: '/encoding-tools',
                title: 'Encoding Tools',
                description:
                  'Base64, URL, and HTML encoding/decoding tools for transport-safe data.',
              },
              {
                href: '/developer-utilities',
                title: 'Developer Utilities',
                description:
                  'Lookups, validators, generators, and parsers for day-to-day engineering tasks.',
              },
            ].map((hub) => (
              <article key={hub.href} className={cardClass}>
                <h3 className="mb-2 text-lg font-bold text-gray-800 dark:text-white/90">
                  {hub.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-6 flex-1">
                  {hub.description}
                </p>
                <Link
                  href={hub.href}
                  className="mt-4 inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition w-fit"
                >
                  Open hub
                </Link>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-14 md:mt-18 max-w-5xl mx-auto w-full">
          <div className="flex items-end justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white/90">
              Legal Tools
            </h2>
            <Link
              href="/legal-tools"
              className="text-sm font-medium text-primary-700 hover:text-primary-800 hover:underline"
            >
              View all legal tools
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                href: '/privacy-policy-generator',
                title: 'Privacy Policy Generator',
                description: 'Generate a privacy policy draft for your website in minutes.',
              },
              {
                href: '/terms-and-conditions-generator',
                title: 'Terms & Conditions Generator',
                description: 'Generate terms and conditions for your website or product.',
              },
            ].map((hub) => (
              <article key={hub.href} className={cardClass}>
                <h3 className="mb-2 text-lg font-bold text-gray-800 dark:text-white/90">
                  {hub.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-6 flex-1">
                  {hub.description}
                </p>
                <Link
                  href={hub.href}
                  className="mt-4 inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition w-fit"
                >
                  Open generator
                </Link>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-14 md:mt-18 max-w-5xl mx-auto w-full">
          <div className="flex items-end justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white/90">
              Top AI tools
            </h2>
            <Link
              href="/ai-tools"
              className="text-sm font-medium text-primary-700 hover:text-primary-800 hover:underline"
            >
              View all AI tools
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topAi.map((t) => (
              <div
                key={t.slug}
                className="bg-white p-6 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)] hover:border-primary-200 dark:hover:border-primary-500/30 transition flex flex-col"
              >
                <h3 className="mb-2 text-lg font-bold text-gray-800 dark:text-white/90">
                  {t.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-6 flex-1">
                  {t.description}
                </p>
                <Link
                  href={`/ai/${t.slug}`}
                  className="mt-4 inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition w-fit"
                >
                  Open Tool
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 md:mt-18 max-w-5xl mx-auto w-full">
          <div className="flex items-end justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white/90">
              Categories
            </h2>
            <Link
              href="/categories"
              className="text-sm font-medium text-primary-700 hover:text-primary-800 hover:underline"
            >
              View all categories
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {CATEGORY_META.map((c) => (
              <div key={c.slug} className={cardClass}>
                <h3 className="mb-2 text-lg font-bold text-gray-800 dark:text-white/90">
                  {c.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-6 flex-1">
                  {c.description}
                </p>
                <Link
                  href={`/category/${c.slug}`}
                  className="mt-4 inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition w-fit"
                >
                  View tools
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 md:mt-18 max-w-5xl mx-auto w-full">
          <div className="flex items-end justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white/90">
              Latest guides
            </h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-primary-700 hover:text-primary-800 hover:underline"
            >
              Read the blog
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topBlogs.map((post) => (
              <article
                key={post.slug}
                className="bg-white p-6 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)] hover:border-primary-200 dark:hover:border-primary-500/30 transition flex flex-col"
              >
                <h3 className="mb-2 text-lg font-bold text-gray-800 dark:text-white/90">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-6 flex-1">
                  {post.description}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition w-fit"
                >
                  Read article
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <FaqAccordion />
    </>
  );
}
