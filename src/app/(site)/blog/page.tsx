import type { Metadata } from 'next';
import Link from 'next/link';
import { blogs } from '@/lib/blogs';
import { getBaseUrl } from '@/lib/site-url';
import { DEFAULT_KEYWORDS } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Read Tech Blogs for Developers | AI Tools, Tutorials and Coding Guides',
  description:
    'Discover free ai coding tools, in-depth tutorials, developer assistants, AI insights, and coding tips. Stay ahead with the latest trends, guides, and resources for developers.',
  keywords: `${DEFAULT_KEYWORDS}, developer blog, json tutorial, base64 guide`,
  alternates: { canonical: getBaseUrl() + '/blog' },
  openGraph: {
    title: 'Read Tech Blogs for Developers | AI Tools, Tutorials and Coding Guides',
    description:
      'Discover free ai coding tools, in-depth tutorials, developer assistants, AI insights, and coding tips. Stay ahead with the latest trends, guides, and resources for developers.',
    url: getBaseUrl() + '/blog',
    type: 'website',
    siteName: 'DevToolDock',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Read Tech Blogs for Developers | AI Tools, Tutorials and Coding Guides',
    description:
      'Discover free ai coding tools, in-depth tutorials, developer assistants, AI insights, and coding tips. Stay ahead with the latest trends, guides, and resources for developers.',
  },
  robots: { index: true, follow: true },
};

export default function BlogListPage() {
  return (
    <div className="wrapper py-14 md:py-28">
      <div className="max-w-2xl mx-auto mb-10 text-center">
        <h1 className="mb-3 font-bold text-center text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
          Developer Blog
        </h1>
        <p className="max-w-2xl mx-auto leading-6 text-gray-500 dark:text-gray-400">
          Guides, tutorials, and resources for developers.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {blogs.map((post) => (
          <article
            key={post.slug}
            className="bg-white p-6 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)] hover:border-primary-200 dark:hover:border-primary-500/30 transition flex flex-col"
          >
            <time
              dateTime={post.date}
              className="text-xs text-gray-500 dark:text-gray-400 mb-2 block"
            >
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <h2 className="mb-2 text-lg font-bold text-gray-800 dark:text-white/90">
              {post.title}
            </h2>
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
  );
}
