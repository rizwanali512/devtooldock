import type { MetadataRoute } from 'next';
import { tools } from '@/lib/tools';
import { aiTools } from '@/lib/ai-tools';
import { CATEGORY_META } from '@/lib/categories';
import { getBlogBySlug, getAllBlogSlugs } from '@/lib/blogs';
import { getBaseUrl } from '@/lib/site-url';
import { SEO_PAGE_SLUGS } from '@/lib/seo-pages';
import { COMPARE_PAGE_SLUGS } from '@/lib/compare-pages';

/** Highest-priority tool URLs for crawling (matches SEO landing priorities). */
const SITEMAP_PRIORITY_TOOLS = new Set([
  'json-formatter',
  'base64-encoder',
  'regex-tester',
  'jwt-decoder',
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const lastModified = new Date();

  const landingPages: string[] = [
    '/json-tools-online',
    '/regex-tools',
    '/base64-tools',
    '/free-developer-tools',
    '/online-developer-tools',
    '/best-json-formatters',
    '/best-regex-tools',
    '/encoding-tools',
    '/text-tools',
    '/ai-developer-tools',
  ];

  const corePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/ai-tools`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/all-tools`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    ...landingPages.map((p) => ({
      url: `${baseUrl}${p}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ];

  const blogPages: MetadataRoute.Sitemap = getAllBlogSlugs().map((slug) => {
    const post = getBlogBySlug(slug);
    return {
      url: `${baseUrl}/blog/${slug}`,
      lastModified: post ? new Date(post.date) : lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    };
  });

  const developerToolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/${tool.slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: SITEMAP_PRIORITY_TOOLS.has(tool.slug) ? 1.0 : 0.9,
  }));

  const aiToolPages: MetadataRoute.Sitemap = aiTools.map((tool) => ({
    url: `${baseUrl}/ai/${tool.slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const categoryPages: MetadataRoute.Sitemap = CATEGORY_META.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const seoPages: MetadataRoute.Sitemap = SEO_PAGE_SLUGS.map((slug) => ({
    url: `${baseUrl}/seo/${slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const comparePages: MetadataRoute.Sitemap = COMPARE_PAGE_SLUGS.map((slug) => ({
    url: `${baseUrl}/compare/${slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...corePages,
    ...developerToolPages,
    ...aiToolPages,
    ...categoryPages,
    ...seoPages,
    ...comparePages,
    ...blogPages,
  ];
}
