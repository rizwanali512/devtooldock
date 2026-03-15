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

export const metadata: Metadata = {
  title: 'DevToolDock – Free Developer Tools & AI Utilities',
  description:
    'DevToolDock provides free developer tools and AI utilities including JSON formatter, Base64 encoder, regex tester, UUID generator, and AI-powered developer tools.',
  keywords: DEFAULT_KEYWORDS,
  alternates: { canonical: getBaseUrl() + '/' },
  openGraph: {
    title: 'DevToolDock – Free Developer Tools & AI Utilities',
    description:
      'DevToolDock provides free developer tools and AI utilities including JSON formatter, Base64 encoder, regex tester, UUID generator, and AI-powered developer tools.',
    url: getBaseUrl() + '/',
    type: 'website',
    siteName: 'DevToolDock',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevToolDock – Free Developer Tools & AI Utilities',
    description:
      'DevToolDock provides free developer tools and AI utilities including JSON formatter, Base64 encoder, regex tester, UUID generator, and AI-powered developer tools.',
  },
};

export default async function Home() {
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
        <PopularTools />
      </section>
      <FaqAccordion />
    </>
  );
}
