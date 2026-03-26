import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { tools } from '@/lib/tools';
import { getBaseUrl } from '@/lib/site-url';
import { DEFAULT_KEYWORDS } from '@/lib/seo';
import { generateToolSchema } from '@/lib/generateToolSchema';
import { getPriorityToolMetadata } from '@/lib/priority-tools-seo';
import { SEOPageTemplate } from '@/components/SEOPageTemplate';
import {
  SEO_PAGES_PUBLISHED,
  buildFaq,
  buildHowToUseSteps,
  buildSeoPageContent,
  buildUseCases,
  getBaseToolForSeoPage,
  getRelatedToolsForSeoPage,
  getSeoPageBySlug,
} from '@/lib/seoPages';
import { getLegalTool, legalTools } from '@/lib/legalTools';
import { LegalToolSeoPage, getLegalToolSchemas } from '@/components/legal/LegalToolSeoPage';
import {
  getLegalBaseTool,
  getLegalSeoPageBySlug,
  getRelatedLegalTools,
  legalSeoPagesPublished,
  buildLegalSeoContent,
  buildLegalSeoFaq,
} from '@/lib/legalSeoPages';
import { LegalSEOPageTemplate } from '@/components/LegalSEOPageTemplate';
import { LegalGeneratorTemplate } from '@/components/LegalGeneratorTemplate';
import { generateSEOContent } from '@/lib/generateSEOContent';

export const revalidate = 86400;

type Loader = () => Promise<{ default: React.ComponentType<object> }>;

const toolLoaders: Record<string, Loader> = {
  'json-formatter': () => import('../tools/json-formatter/page'),
  'json-validator': () => import('../tools/json-validator/page'),
  'json-to-csv': () => import('../tools/json-to-csv/page'),
  'csv-to-json': () => import('../tools/csv-to-json/page'),
  'json-to-xml': () => import('../tools/json-to-xml/page'),
  'json-minifier': () => import('../tools/json-minifier/page'),
  'json-pretty-print': () => import('../tools/json-pretty-print/page'),
  'xml-to-json': () => import('../tools/xml-to-json/page'),
  'json-to-yaml': () => import('../tools/json-to-yaml/page'),
  'yaml-to-json': () => import('../tools/yaml-to-json/page'),
  'csv-to-tsv': () => import('../tools/csv-to-tsv/page'),
  'tsv-to-csv': () => import('../tools/tsv-to-csv/page'),

  'base64-encoder': () => import('../tools/base64-encoder/page'),
  'base64-decoder': () => import('../tools/base64-decoder/page'),
  'url-encoder': () => import('../tools/url-encoder/page'),
  'url-decoder': () => import('../tools/url-decoder/page'),
  'html-encoder': () => import('../tools/html-encoder/page'),
  'html-decoder': () => import('../tools/html-decoder/page'),
  'base64-to-image': () => import('../tools/base64-to-image/page'),
  'image-to-base64': () => import('../tools/image-to-base64/page'),

  'jwt-decoder': () => import('../tools/jwt-decoder/page'),
  'uuid-generator': () => import('../tools/uuid-generator/page'),
  'uuid-validator': () => import('../tools/uuid-validator/page'),
  'password-generator': () => import('../tools/password-generator/page'),
  'sha256-generator': () => import('../tools/sha256-generator/page'),
  'md5-generator': () => import('../tools/md5-generator/page'),

  'regex-tester': () => import('../tools/regex-tester/page'),
  'regex-generator': () => import('../tools/regex-generator/page'),
  'regex-explainer': () => import('../tools/regex-explainer/page'),
  'text-diff-checker': () => import('../tools/text-diff-checker/page'),
  'remove-duplicate-lines': () => import('../tools/remove-duplicate-lines/page'),
  'sort-text-lines': () => import('../tools/sort-text-lines/page'),
  'word-counter': () => import('../tools/word-counter/page'),
  'case-converter': () => import('../tools/case-converter/page'),
  'slug-generator': () => import('../tools/slug-generator/page'),
  'random-string-generator': () => import('../tools/random-string-generator/page'),
  'lorem-ipsum-generator': () => import('../tools/lorem-ipsum-generator/page'),
  'json-diff-viewer': () => import('../tools/json-diff-viewer/page'),

  'css-minifier': () => import('../tools/css-minifier/page'),
  'css-beautifier': () => import('../tools/css-beautifier/page'),
  'js-minifier': () => import('../tools/js-minifier/page'),
  'html-minifier': () => import('../tools/html-minifier/page'),
  'js-beautifier': () => import('../tools/js-beautifier/page'),
  'meta-tag-generator': () => import('../tools/meta-tag-generator/page'),
  'robots-txt-generator': () => import('../tools/robots-txt-generator/page'),

  'timestamp-converter': () => import('../tools/timestamp-converter/page'),
  'unix-timestamp-converter': () => import('../tools/unix-timestamp-converter/page'),
  'color-converter': () => import('../tools/color-converter/page'),
  'url-parser': () => import('../tools/url-parser/page'),
  'http-header-parser': () => import('../tools/http-header-parser/page'),
  'cron-expression-generator': () => import('../tools/cron-expression-generator/page'),
  'date-difference-calculator': () =>
    import('../tools/date-difference-calculator/page'),
  'hex-to-rgb': () => import('../tools/hex-to-rgb/page'),
  'timezone-converter': () => import('../tools/timezone-converter/page'),
  'date-format-converter': () => import('../tools/date-format-converter/page'),
  'rgb-to-hex': () => import('../tools/rgb-to-hex/page'),
  'color-picker': () => import('../tools/color-picker/page'),
  'gradient-generator': () => import('../tools/gradient-generator/page'),
  'css-shadow-generator': () => import('../tools/css-shadow-generator/page'),
  'query-string-parser': () => import('../tools/query-string-parser/page'),
  'utm-link-generator': () => import('../tools/utm-link-generator/page'),
  'text-reverser': () => import('../tools/text-reverser/page'),
  'random-text-generator': () => import('../tools/random-text-generator/page'),
  'markdown-to-html': () => import('../tools/markdown-to-html/page'),
  'html-to-markdown': () => import('../tools/html-to-markdown/page'),
  'http-status-code-lookup': () => import('../tools/http-status-code-lookup/page'),
  'regex-cheatsheet-generator': () => import('../tools/regex-cheatsheet-generator/page'),
  'password-strength-checker': () => import('../tools/password-strength-checker/page'),
  'port-number-lookup': () => import('../tools/port-number-lookup/page'),
  'json-to-typescript-interface': () =>
    import('../tools/json-to-typescript-interface/page'),
  'bcrypt-generator': () => import('../tools/bcrypt-generator/page'),
  'jwt-generator': () => import('../tools/jwt-generator/page'),
  'hash-compare': () => import('../tools/hash-compare/page'),
  'checksum-generator': () => import('../tools/checksum-generator/page'),
  'random-token-generator': () => import('../tools/random-token-generator/page'),
  'htaccess-generator': () => import('../tools/htaccess-generator/page'),
  'favicon-generator': () => import('../tools/favicon-generator/page'),
  'open-graph-preview': () => import('../tools/open-graph-preview/page'),
};

export function generateStaticParams() {
  return [
    ...tools.map((t) => ({ tool: t.slug })),
    ...SEO_PAGES_PUBLISHED.map((p) => ({ tool: p.slug })),
    ...legalTools.map((t) => ({ tool: t.slug })),
    ...legalSeoPagesPublished.map((p) => ({ tool: p.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}): Promise<Metadata> {
  const { tool } = await params;
  const t = tools.find((x) => x.slug === tool);
  const seoPage = getSeoPageBySlug(tool);
  const legalTool = getLegalTool(tool);
  const legalSeo = getLegalSeoPageBySlug(tool);

  if (!t && !seoPage && !legalTool && !legalSeo) return { title: 'Tool not found' };

  if (t) {
    const canonical = getBaseUrl() + '/' + t.slug;
    const priority = getPriorityToolMetadata(t.slug);
    const title = priority?.title ?? `${t.name} – Free Online Tool`;
    const description =
      priority?.description ??
      `${t.description} Free online developer tool on DevToolDock.`;
    const keywords = priority?.keywords ?? `${t.name}, ${DEFAULT_KEYWORDS}`;
    return {
      title,
      description,
      keywords,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        type: 'website',
        siteName: 'DevToolDock',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
    };
  }

  if (legalTool) {
    const canonical = `${getBaseUrl()}/${legalTool.slug}`;
    const title = `${legalTool.name} – Free Online Tool | DevToolDock`;
    const description = legalTool.description;
    return {
      title,
      description,
      keywords: `${DEFAULT_KEYWORDS}, ${legalTool.name.toLowerCase()}, legal generator, legal tools`,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        type: 'website',
        siteName: 'DevToolDock',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
    };
  }

  if (legalSeo) {
    const baseTool = getLegalBaseTool(legalSeo);
    if (!baseTool) return { title: 'Page not found' };
    const canonical = `${getBaseUrl()}/${legalSeo.slug}`;
    const title = legalSeo.title;
    const description = `Use ${legalSeo.keyword} with DevToolDock’s ${baseTool.name}. Generate a draft online, then explore related legal templates.`;
    return {
      title,
      description,
      keywords: `${DEFAULT_KEYWORDS}, ${legalSeo.keyword}, ${baseTool.name.toLowerCase()}, legal tools`,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        type: 'website',
        siteName: 'DevToolDock',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
    };
  }

  const baseTool = seoPage ? getBaseToolForSeoPage(seoPage) : null;
  if (!seoPage || !baseTool) return { title: 'Page not found' };
  const canonical = getBaseUrl() + '/' + seoPage.slug;
  const title = seoPage.title;
  const description = seoPage.description;
  const keywords = `${DEFAULT_KEYWORDS}, ${seoPage.keyword}, ${baseTool.name.toLowerCase()}, ${seoPage.category} tools`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'DevToolDock',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ToolRoute({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool: toolSlug } = await params;
  const tool = tools.find((t) => t.slug === toolSlug);
  const loader = toolLoaders[toolSlug];

  if (loader && tool) {
    const Mod = await loader();
    const ToolPage = Mod.default;
    const jsonLdSchemas = generateToolSchema(tool);

    return (
      <>
        {jsonLdSchemas.map((schema, i) => (
          <script
            key={`${String(schema['@type'])}-${i}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <ToolPage />
      </>
    );
  }

  const legalTool = getLegalTool(toolSlug);
  if (legalTool) {
    const canonical = `${getBaseUrl()}/${legalTool.slug}`;
    const { webAppSchema, faqSchema } = getLegalToolSchemas(legalTool);
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <LegalToolSeoPage tool={legalTool} />
        <link rel="canonical" href={canonical} />
      </>
    );
  }

  const legalSeo = getLegalSeoPageBySlug(toolSlug);
  if (legalSeo) {
    const baseTool = getLegalBaseTool(legalSeo);
    if (!baseTool) notFound();
    const related = getRelatedLegalTools(baseTool.slug, 5);
    const canonical = `${getBaseUrl()}/${legalSeo.slug}`;

    const auto = generateSEOContent({
      keyword: legalSeo.keyword,
      toolName: baseTool.name,
      category: 'legal',
      type: 'seo',
    });
    const content = auto.intro.split(/\n\n+/).filter(Boolean);
    const howToUse = auto.howToUse;
    const useCases = auto.useCases;
    const faq = auto.faq.map((f) => ({ q: f.question, a: f.answer }));

    const webAppSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: legalSeo.title,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any',
      url: canonical,
      description: `Generate a draft using ${baseTool.name} for the keyword "${legalSeo.keyword}".`,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
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

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <LegalSEOPageTemplate
          page={legalSeo}
          baseTool={baseTool}
          content={content}
          howToUse={howToUse}
          useCases={useCases}
          faq={faq}
          relatedTools={related}
          embeddedTool={<LegalGeneratorTemplate tool={baseTool} />}
        />
        <link rel="canonical" href={canonical} />
      </>
    );
  }

  const seoPage = getSeoPageBySlug(toolSlug);
  if (!seoPage) notFound();

  const baseTool = getBaseToolForSeoPage(seoPage);
  if (!baseTool) notFound();
  const baseToolLoader = toolLoaders[baseTool.slug];
  if (!baseToolLoader) notFound();
  const BaseToolMod = await baseToolLoader();
  const EmbeddedTool = BaseToolMod.default;
  const relatedTools = getRelatedToolsForSeoPage(seoPage, 5);
  const content = buildSeoPageContent(seoPage, baseTool);
  const howToUse = buildHowToUseSteps(seoPage, baseTool);
  const useCases = buildUseCases(seoPage);
  const faq = buildFaq(seoPage, baseTool);
  const canonical = getBaseUrl() + '/' + seoPage.slug;
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: seoPage.title,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    url: canonical,
    description: seoPage.description,
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
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SEOPageTemplate
        page={seoPage}
        baseTool={baseTool}
        relatedTools={relatedTools}
        content={content}
        howToUse={howToUse}
        useCases={useCases}
        faq={faq}
        embeddedTool={<EmbeddedTool />}
      />
    </>
  );
}

