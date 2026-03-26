import { legalTools, type LegalTool } from '@/lib/legalTools';

export type LegalSeoPageType = 'intent' | 'audience' | 'use-case';

export type LegalSeoPage = {
  slug: string;
  keyword: string;
  title: string;
  baseTool: string;
  type: LegalSeoPageType;
};

const seeds: LegalSeoPage[] = [
  {
    slug: 'privacy-policy-generator-free',
    keyword: 'privacy policy generator free',
    title: 'Free Privacy Policy Generator – Create Policy Online',
    baseTool: 'privacy-policy-generator',
    type: 'intent',
  },
  {
    slug: 'privacy-policy-for-blog',
    keyword: 'privacy policy for blog',
    title: 'Privacy Policy for Blog – Free Generator',
    baseTool: 'privacy-policy-generator',
    type: 'audience',
  },
];

const variations: Array<{
  baseTool: LegalTool['slug'];
  type: LegalSeoPageType;
  slugSuffix: string;
  keyword: string;
  title: string;
}> = [
  // Privacy policy
  {
    baseTool: 'privacy-policy-generator',
    type: 'intent',
    slugSuffix: 'online',
    keyword: 'privacy policy generator online',
    title: 'Privacy Policy Generator Online – Create a Policy Fast',
  },
  {
    baseTool: 'privacy-policy-generator',
    type: 'audience',
    slugSuffix: 'for-shopify',
    keyword: 'privacy policy for shopify store',
    title: 'Privacy Policy for Shopify Store – Free Generator',
  },
  {
    baseTool: 'privacy-policy-generator',
    type: 'audience',
    slugSuffix: 'for-saas',
    keyword: 'privacy policy for saas',
    title: 'Privacy Policy for SaaS – Free Generator',
  },
  {
    baseTool: 'privacy-policy-generator',
    type: 'use-case',
    slugSuffix: 'for-analytics',
    keyword: 'privacy policy for analytics',
    title: 'Privacy Policy for Analytics – Generate a Draft Online',
  },

  // Terms
  {
    baseTool: 'terms-and-conditions-generator',
    type: 'intent',
    slugSuffix: 'online',
    keyword: 'terms generator online',
    title: 'Terms Generator Online – Free Terms & Conditions Draft',
  },
  {
    baseTool: 'terms-and-conditions-generator',
    type: 'audience',
    slugSuffix: 'for-website',
    keyword: 'terms and conditions for website',
    title: 'Terms & Conditions for Website – Free Generator',
  },
  {
    baseTool: 'terms-and-conditions-generator',
    type: 'audience',
    slugSuffix: 'for-app',
    keyword: 'terms and conditions for app',
    title: 'Terms & Conditions for App – Generate Terms Online',
  },
  {
    baseTool: 'terms-and-conditions-generator',
    type: 'use-case',
    slugSuffix: 'for-digital-products',
    keyword: 'terms for digital products',
    title: 'Terms for Digital Products – Free Generator',
  },

  // Cookies
  {
    baseTool: 'cookie-policy-generator',
    type: 'intent',
    slugSuffix: 'online',
    keyword: 'cookie policy generator',
    title: 'Cookie Policy Generator – Create a Cookie Policy Online',
  },
  {
    baseTool: 'cookie-policy-generator',
    type: 'audience',
    slugSuffix: 'for-wordpress',
    keyword: 'cookie policy for wordpress',
    title: 'Cookie Policy for WordPress – Free Generator',
  },
  {
    baseTool: 'cookie-policy-generator',
    type: 'use-case',
    slugSuffix: 'for-google-analytics',
    keyword: 'cookie policy for google analytics',
    title: 'Cookie Policy for Google Analytics – Generate a Draft',
  },

  // Refunds
  {
    baseTool: 'refund-policy-generator',
    type: 'intent',
    slugSuffix: 'online',
    keyword: 'refund policy generator',
    title: 'Refund Policy Generator – Create a Refund Policy Online',
  },
  {
    baseTool: 'refund-policy-generator',
    type: 'audience',
    slugSuffix: 'for-digital-products',
    keyword: 'refund policy for digital products',
    title: 'Refund Policy for Digital Products – Free Generator',
  },
  {
    baseTool: 'refund-policy-generator',
    type: 'audience',
    slugSuffix: 'for-saas',
    keyword: 'refund policy for saas',
    title: 'Refund Policy for SaaS – Generate a Draft Online',
  },

  // Disclaimer
  {
    baseTool: 'disclaimer-generator',
    type: 'intent',
    slugSuffix: 'online',
    keyword: 'disclaimer generator',
    title: 'Disclaimer Generator – Create a Disclaimer Online',
  },
  {
    baseTool: 'disclaimer-generator',
    type: 'audience',
    slugSuffix: 'for-blog',
    keyword: 'disclaimer for blog',
    title: 'Disclaimer for Blog – Free Generator',
  },
  {
    baseTool: 'disclaimer-generator',
    type: 'use-case',
    slugSuffix: 'affiliate',
    keyword: 'website disclaimer for affiliate links',
    title: 'Website Disclaimer for Affiliate Links – Generate Online',
  },

  // EULA
  {
    baseTool: 'eula-generator',
    type: 'intent',
    slugSuffix: 'online',
    keyword: 'eula generator',
    title: 'EULA Generator – Create an EULA Online',
  },
  {
    baseTool: 'eula-generator',
    type: 'audience',
    slugSuffix: 'for-mobile-app',
    keyword: 'eula for mobile app',
    title: 'EULA for Mobile App – Free Generator',
  },
  {
    baseTool: 'eula-generator',
    type: 'use-case',
    slugSuffix: 'non-exclusive-license',
    keyword: 'non exclusive software license agreement',
    title: 'Non‑Exclusive Software License Agreement – Draft Generator',
  },

  // Affiliate disclosure
  {
    baseTool: 'affiliate-disclosure-generator',
    type: 'intent',
    slugSuffix: 'free',
    keyword: 'affiliate disclosure generator free',
    title: 'Affiliate Disclosure Generator Free – Create Disclosure Online',
  },
  {
    baseTool: 'affiliate-disclosure-generator',
    type: 'audience',
    slugSuffix: 'for-bloggers',
    keyword: 'affiliate disclosure for bloggers',
    title: 'Affiliate Disclosure for Bloggers – Free Generator',
  },
  {
    baseTool: 'affiliate-disclosure-generator',
    type: 'use-case',
    slugSuffix: 'amazon-associates',
    keyword: 'amazon associates disclosure template',
    title: 'Amazon Associates Disclosure Template – Generate Online',
  },

  // DMCA
  {
    baseTool: 'dmca-policy-generator',
    type: 'intent',
    slugSuffix: 'online',
    keyword: 'dmca policy generator',
    title: 'DMCA Policy Generator – Create a DMCA Policy Online',
  },
  {
    baseTool: 'dmca-policy-generator',
    type: 'audience',
    slugSuffix: 'for-website',
    keyword: 'dmca policy for website',
    title: 'DMCA Policy for Website – Free Generator',
  },
  {
    baseTool: 'dmca-policy-generator',
    type: 'use-case',
    slugSuffix: 'takedown-notice',
    keyword: 'dmca takedown policy template',
    title: 'DMCA Takedown Policy Template – Generate a Draft',
  },

  // AUP
  {
    baseTool: 'acceptable-use-policy-generator',
    type: 'intent',
    slugSuffix: 'online',
    keyword: 'acceptable use policy generator',
    title: 'Acceptable Use Policy Generator – Create an AUP Online',
  },
  {
    baseTool: 'acceptable-use-policy-generator',
    type: 'audience',
    slugSuffix: 'for-saas',
    keyword: 'acceptable use policy for saas',
    title: 'Acceptable Use Policy for SaaS – Free Generator',
  },
  {
    baseTool: 'acceptable-use-policy-generator',
    type: 'use-case',
    slugSuffix: 'prohibited-content',
    keyword: 'acceptable use policy prohibited content',
    title: 'Acceptable Use Policy (Prohibited Content) – Draft Generator',
  },

  // SaaS Terms
  {
    baseTool: 'saas-terms-generator',
    type: 'intent',
    slugSuffix: 'online',
    keyword: 'saas terms generator',
    title: 'SaaS Terms Generator – Create Terms of Service Online',
  },
  {
    baseTool: 'saas-terms-generator',
    type: 'audience',
    slugSuffix: 'for-startups',
    keyword: 'saas terms for startups',
    title: 'SaaS Terms for Startups – Free Generator',
  },
  {
    baseTool: 'saas-terms-generator',
    type: 'use-case',
    slugSuffix: 'subscription-terms',
    keyword: 'subscription terms and conditions',
    title: 'Subscription Terms & Conditions – Draft Generator',
  },
];

function isValidBaseToolSlug(slug: string): boolean {
  return legalTools.some((t) => t.slug === slug);
}

function makeSlug(baseTool: string, suffix: string): string {
  return `${baseTool}-${suffix}`.replace(/--+/g, '-');
}

const seenSlugs = new Set<string>();
const seenTitles = new Set<string>();

const merged = [
  ...seeds,
  ...variations
    .filter((v) => isValidBaseToolSlug(v.baseTool))
    .map((v) => ({
      slug: makeSlug(v.baseTool, v.slugSuffix),
      keyword: v.keyword,
      title: v.title,
      baseTool: v.baseTool,
      type: v.type,
    })),
].filter((p) => {
  const slug = p.slug.toLowerCase();
  const title = p.title.toLowerCase();
  if (seenSlugs.has(slug)) return false;
  if (seenTitles.has(title)) return false;
  if (legalTools.some((t) => t.slug === slug)) return false;
  seenSlugs.add(slug);
  seenTitles.add(title);
  return true;
});

export const legalSeoPages: LegalSeoPage[] = merged.slice(0, 40);

export const LEGAL_SEO_PUBLISH_LIMIT = 20;
export const legalSeoPagesPublished: LegalSeoPage[] = legalSeoPages.slice(0, LEGAL_SEO_PUBLISH_LIMIT);

export function getLegalSeoPageBySlug(slug: string): LegalSeoPage | null {
  return legalSeoPagesPublished.find((p) => p.slug === slug) ?? null;
}

export function getLegalBaseTool(page: LegalSeoPage): LegalTool | null {
  return legalTools.find((t) => t.slug === page.baseTool) ?? null;
}

export function getRelatedLegalTools(baseToolSlug: string, limit = 5): LegalTool[] {
  return legalTools.filter((t) => t.slug !== baseToolSlug).slice(0, limit);
}

function hash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) h = (h * 31 + input.charCodeAt(i)) >>> 0;
  return h;
}

export function buildLegalSeoContent(page: LegalSeoPage, tool: LegalTool): string[] {
  const k = page.keyword;
  const n = tool.name;
  const idx = hash(page.slug);

  const angles: string[] = [
    `This page targets the keyword "${k}" and embeds the real ${n} so you can generate a draft immediately.`,
    `If you searched for "${k}", this page is a practical shortcut: answer a few questions and export a clean document.`,
    `Use this "${k}" page to create a structured draft quickly, then review and customize it for your exact setup.`,
  ];

  const typeLine =
    page.type === 'audience'
      ? 'It is written for a specific audience context (for example a blog, SaaS, or store) so the wording is not generic filler.'
      : page.type === 'use-case'
        ? 'It focuses on a specific use case (for example analytics, affiliate links, or subscriptions) to keep the content useful and distinct.'
        : 'It is intent-focused (free/online/draft) to match high-intent searches while staying useful and indexable.';

  const workflowLine =
    idx % 2 === 0
      ? 'Start by entering your website name, URL, and country, then fill tool-specific fields like contact email or refund window when prompted.'
      : 'Fill the core site details first, then confirm whether you collect emails, use cookies, or run analytics so the output matches your actual practices.';

  const internalLine =
    'You can also jump to the main generator page, browse the Legal Tools directory, or open related legal templates to complete a full policy set.';

  return [
    angles[idx % angles.length],
    typeLine,
    workflowLine,
    internalLine,
  ];
}

export function buildLegalSeoFaq(page: LegalSeoPage, tool: LegalTool): Array<{ q: string; a: string }> {
  const canonical = `/${page.slug}`;
  return [
    {
      q: `Is this "${page.keyword}" generator free?`,
      a: `Yes. This page embeds the ${tool.name} so you can generate a draft in the browser and copy or download it.`,
    },
    {
      q: `What is the difference between "${page.keyword}" and the main ${tool.name} page?`,
      a: `They use the same generator UI. This page is tailored to the keyword and intent type ("${page.type}") with unique guidance and internal links.`,
    },
    {
      q: 'Can I publish the document as-is?',
      a: 'You should review the draft and customize it for your business model, data practices, and third-party services before publishing.',
    },
    {
      q: 'Where can I find other legal templates?',
      a: `Browse /legal-tools for related generators, or open the related tools section on this page. Canonical URL: ${canonical}.`,
    },
  ];
}

