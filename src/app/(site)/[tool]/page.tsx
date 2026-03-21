import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { tools } from '@/lib/tools';
import { getBaseUrl } from '@/lib/site-url';
import { DEFAULT_KEYWORDS } from '@/lib/seo';
import { generateToolSchema } from '@/lib/generateToolSchema';
import { getPriorityToolMetadata } from '@/lib/priority-tools-seo';

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
  return tools.map((t) => ({ tool: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}): Promise<Metadata> {
  const { tool } = await params;
  const t = tools.find((x) => x.slug === tool);
  if (!t) return { title: 'Tool not found' };
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

export default async function ToolRoute({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool: toolSlug } = await params;
  const tool = tools.find((t) => t.slug === toolSlug);
  const loader = toolLoaders[toolSlug];
  if (!loader || !tool) notFound();

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

