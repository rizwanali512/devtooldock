'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { tools } from '@/lib/tools';
import { aiTools } from '@/lib/ai-tools';
import { CATEGORY_META, getCategoryDisplayName } from '@/lib/categories';

const CATEGORY_FILTERS = [
  'All',
  ...CATEGORY_META.map((c) => c.name),
] as const;

type CategoryFilter = (typeof CATEGORY_FILTERS)[number];

const labelToSlug: Record<string, string> = Object.fromEntries([
  ['All', ''],
  ...CATEGORY_META.map((c) => [c.name, c.slug] as [string, string]),
]);

export default function ToolsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>('All');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tools.filter((t) => {
      const slug = labelToSlug[selectedCategory];
      const matchesCategory =
        selectedCategory === 'All' || t.category === slug;
      const matchesSearch =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        getCategoryDisplayName(t.category).toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  return (
    <div className="wrapper py-14 md:py-28">
      <div className="max-w-2xl mx-auto mb-10 text-center">
        <h1 className="mb-3 font-bold text-center text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
          Developer Tools
        </h1>
        <p className="max-w-2xl mx-auto leading-6 text-gray-500 dark:text-gray-400 mb-8">
          Free, fast tools for developers. Format JSON, encode/decode, generate hashes, and more.
        </p>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search developer tools..."
          className="w-full max-w-md mx-auto rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm text-gray-800 dark:text-white/90 bg-white dark:bg-white/5 placeholder:text-gray-400 focus-visible:border-primary-300 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-dark-primary block"
        />

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {CATEGORY_FILTERS.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={
                  active
                    ? 'inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition'
                    : 'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition'
                }
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {filtered.map((tool) => (
          <div
            key={tool.slug}
            className="bg-white p-6 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)] hover:border-primary-200 dark:hover:border-primary-500/30 transition flex flex-col"
          >
            <div className="mb-3">
              <span className="inline-flex items-center rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300">
                {getCategoryDisplayName(tool.category)}
              </span>
            </div>
            <h2 className="mb-2 text-lg font-bold text-gray-800 dark:text-white/90">
              {tool.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-6 flex-1">
              {tool.description}
            </p>
            <Link
              href={`/${tool.slug}`}
              className="mt-4 inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition w-fit"
            >
              Open Tool
            </Link>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          No tools match your search.
        </p>
      )}

      <div className="max-w-6xl mx-auto mt-14 md:mt-18">
        <div className="flex items-end justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white/90">
            AI tools (quick access)
          </h2>
          <Link
            href="/ai-tools"
            className="text-sm font-medium text-primary-700 hover:text-primary-800 hover:underline"
          >
            View all AI tools
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {aiTools.map((tool) => (
            <div
              key={tool.slug}
              className="bg-white p-6 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)] hover:border-primary-200 dark:hover:border-primary-500/30 transition flex flex-col"
            >
              <div className="mb-3">
                <span className="inline-flex items-center rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300">
                  AI
                </span>
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-800 dark:text-white/90">
                {tool.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-6 flex-1">
                {tool.description}
              </p>
              <Link
                href={`/ai/${tool.slug}`}
                className="mt-4 inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition w-fit"
              >
                Open Tool
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
