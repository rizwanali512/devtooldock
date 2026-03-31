import Link from 'next/link';
import { LegalGeneratorTemplate } from '@/components/LegalGeneratorTemplate';
import { getBaseUrl } from '@/lib/site-url';
import { getLegalToolCategoryLabel, legalTools, type LegalTool } from '@/lib/legalTools';
import { getPopularTools } from '@/lib/tools';
import { AutoSEOContent } from '@/components/AutoSEOContent';

function getKeywordPhrase(tool: LegalTool): string {
  switch (tool.slug) {
    case 'privacy-policy-generator':
      return 'privacy policy generator free';
    case 'terms-and-conditions-generator':
      return 'terms generator online';
    case 'cookie-policy-generator':
      return 'cookie policy generator';
    default:
      return `${tool.name.toLowerCase()} online`;
  }
}

function buildFaq(tool: LegalTool): Array<{ q: string; a: string }> {
  const category = getLegalToolCategoryLabel(tool.category);
  return [
    {
      q: `Is the ${tool.name} free to use?`,
      a: 'Yes. You can generate a draft document directly in your browser and copy or download it.',
    },
    {
      q: `Does this document work for ${category.toLowerCase()} compliance?`,
      a: 'It is a helpful starting draft, but requirements vary by country and business model. Review and adapt it for your exact situation.',
    },
    {
      q: 'Can I publish this document as-is?',
      a: 'You should review the draft carefully and customize it to your site’s data practices, third-party services, and policies before publishing.',
    },
    {
      q: 'Does this replace legal advice?',
      a: 'No. Every generated document includes a disclaimer stating it is informational and not legal advice.',
    },
  ];
}

export function getLegalToolSchemas(tool: LegalTool) {
  const canonical = `${getBaseUrl()}/${tool.slug}`;
  const faq = buildFaq(tool);
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    url: canonical,
    description: tool.description,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
  return { webAppSchema, faqSchema, faq };
}

export function LegalToolSeoPage({ tool }: { tool: LegalTool }) {
  const keyword = getKeywordPhrase(tool);
  const seoInput = {
    keyword,
    toolName: tool.name,
    category: tool.category,
    type: 'legal' as const,
  };
  void getLegalToolSchemas(tool);
  const related = legalTools.filter((t) => t.slug !== tool.slug).slice(0, 4);
  const popular = getPopularTools().slice(0, 5);

  return (
    <div className="wrapper py-14 md:py-28">
      <div className="max-w-5xl mx-auto w-full">
        <div className="grid gap-6 lg:grid-cols-1">
          <div className="bg-white p-6 sm:p-9 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)]">
            <LegalGeneratorTemplate tool={tool} />
          </div>

          <section className="bg-white p-6 sm:p-9 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)]">
            <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">Introduction</h2>
            <AutoSEOContent section="intro" input={seoInput} />
          </section>

          <section className="bg-white p-6 sm:p-9 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)]">
            <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">
              Why you need it
            </h2>
            <AutoSEOContent section="useCases" input={seoInput} />
          </section>

          <section className="bg-white p-6 sm:p-9 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)]">
            <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">How to use</h2>
            <AutoSEOContent section="howToUse" input={seoInput} />
          </section>

          <section className="bg-white p-6 sm:p-9 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)]">
            <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">FAQ</h2>
            <AutoSEOContent section="faq" input={seoInput} />
          </section>

          <section className="bg-white p-6 sm:p-9 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)]">
            <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">
              Related legal tools
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {related.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/${t.slug}`}
                    className="block rounded-xl border border-gray-200 dark:border-white/10 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:border-primary-300 dark:hover:border-primary-500/40 transition"
                  >
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/legal-tools"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
              >
                All legal tools
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition"
              >
                Homepage
              </Link>
            </div>
          </section>

          <section className="bg-white p-6 sm:p-9 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)]">
            <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">
              Popular tools on DevToolDock
            </h2>
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {popular.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={t.href}
                    className="text-primary-700 hover:text-primary-800 dark:hover:text-primary-400 hover:underline text-sm md:text-base"
                  >
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

