import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getBlogBySlug, getAllBlogSlugs } from '@/lib/blogs';
import { getBaseUrl } from '@/lib/site-url';
import { PopularTools } from '@/components/tools/PopularTools';

/** Tool slugs that can be embedded in blog posts. Maps to the tool page component (reuses ToolLayout). */
const EMBEDDABLE_TOOL_LOADERS: Record<
  string,
  () => Promise<{ default: React.ComponentType }>
> = {
  'json-formatter': () => import('../../tools/json-formatter/page'),
  'base64-encoder': () => import('../../tools/base64-encoder/page'),
  'url-encoder': () => import('../../tools/url-encoder/page'),
};

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post)
    return { title: 'Post not found' };

  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/blog/${post.slug}`;

  const title =
    post.slug === 'how-to-format-json'
      ? 'How to Format JSON – Complete Developer Guide'
      : post.title;
  const description =
    post.slug === 'how-to-format-json'
      ? 'Learn how to format JSON, fix common JSON errors, and use online tools to clean and validate JSON data.'
      : post.description;

  return {
    title,
    description,
    keywords: `${post.title}, developer tools, tutorial`,
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      url,
      siteName: 'DevToolDock',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: { canonical: url },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const baseUrl = getBaseUrl();
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl + '/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: baseUrl + '/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: baseUrl + '/blog/' + post.slug,
      },
    ],
  };

  const embedToolSlug = post.embedTool;
  const loader =
    embedToolSlug && EMBEDDABLE_TOOL_LOADERS[embedToolSlug]
      ? EMBEDDABLE_TOOL_LOADERS[embedToolSlug]
      : null;
  const EmbeddedTool = loader ? (await loader()).default : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="wrapper py-14 md:py-28">
        <article className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 mb-6"
          >
            ← Back to blog
          </Link>
          <header className="mb-8">
            <h1 className="mb-3 font-bold text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
              <span>{post.author}</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </header>
          <div
            className="blog-content prose prose-gray dark:prose-invert max-w-none prose-p:leading-7 prose-a:text-primary-500 prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {EmbeddedTool ? (
          <section className="mt-14 md:mt-18" aria-label="Try the tool">
            <Suspense
              fallback={
                <div className="max-w-5xl mx-auto py-12 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  Loading tool…
                </div>
              }
            >
              <EmbeddedTool />
            </Suspense>
          </section>
        ) : null}

        <section className="mt-14 md:mt-18">
          <PopularTools />
        </section>
      </div>
    </>
  );
}
