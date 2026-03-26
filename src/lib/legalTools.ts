export type LegalToolCategory =
  | 'legal'
  | 'privacy'
  | 'terms'
  | 'cookies'
  | 'refunds'
  | 'disclaimer';

export type LegalTool = {
  name: string;
  slug: string;
  category: LegalToolCategory;
  description: string;
};

export const legalTools: LegalTool[] = [
  {
    name: 'EULA Generator',
    slug: 'eula-generator',
    category: 'legal',
    description: 'Generate an end-user license agreement draft.',
  },
  {
    name: 'Affiliate Disclosure Generator',
    slug: 'affiliate-disclosure-generator',
    category: 'legal',
    description: 'Generate an affiliate disclosure for your website.',
  },
  {
    name: 'DMCA Policy Generator',
    slug: 'dmca-policy-generator',
    category: 'legal',
    description: 'Generate a DMCA policy and takedown process.',
  },
  {
    name: 'Acceptable Use Policy Generator',
    slug: 'acceptable-use-policy-generator',
    category: 'legal',
    description: 'Generate an acceptable use policy for your service.',
  },
  {
    name: 'SaaS Terms Generator',
    slug: 'saas-terms-generator',
    category: 'legal',
    description: 'Generate SaaS terms for a subscription product.',
  },
  {
    name: 'Privacy Policy Generator',
    slug: 'privacy-policy-generator',
    category: 'privacy',
    description: 'Generate a privacy policy draft in minutes.',
  },
  {
    name: 'Terms & Conditions Generator',
    slug: 'terms-and-conditions-generator',
    category: 'terms',
    description: 'Generate terms & conditions for your site.',
  },
  {
    name: 'Cookie Policy Generator',
    slug: 'cookie-policy-generator',
    category: 'cookies',
    description: 'Generate a cookie policy draft for your site.',
  },
  {
    name: 'Refund Policy Generator',
    slug: 'refund-policy-generator',
    category: 'refunds',
    description: 'Generate a refund policy draft for customers.',
  },
  {
    name: 'Disclaimer Generator',
    slug: 'disclaimer-generator',
    category: 'disclaimer',
    description: 'Generate a general website disclaimer.',
  },
];

export function getLegalTool(slug: string): LegalTool | null {
  return legalTools.find((t) => t.slug === slug) ?? null;
}

export function getLegalToolCategoryLabel(category: LegalToolCategory): string {
  switch (category) {
    case 'legal':
      return 'Legal';
    case 'privacy':
      return 'Privacy';
    case 'terms':
      return 'Terms';
    case 'cookies':
      return 'Cookies';
    case 'refunds':
      return 'Refunds';
    case 'disclaimer':
      return 'Disclaimers';
    default:
      return category;
  }
}

