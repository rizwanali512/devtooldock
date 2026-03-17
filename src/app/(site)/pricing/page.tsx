import FaqAccordion from '@/components/sections/faq-accordion';
import type { Metadata } from 'next';
import PricingSection from '@/components/sections/pricing';
import { getBaseUrl } from '@/lib/site-url';

export const metadata: Metadata = {
  title: 'Pricing',
  alternates: { canonical: getBaseUrl() + '/pricing' },
  robots: { index: false, follow: false },
};

export default async function PricingPage() {
  return (
    <>
      <PricingSection />
      <FaqAccordion />
    </>
  );
}
