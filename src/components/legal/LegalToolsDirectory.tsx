'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { LegalTool, LegalToolCategory } from '@/lib/legalTools';
import { getLegalToolCategoryLabel } from '@/lib/legalTools';

type CategoryOption = { id: 'all' | LegalToolCategory; label: string };

export default function LegalToolsDirectory({
  tools,
  categories,
  cardClass,
}: {
  tools: LegalTool[];
  categories: CategoryOption[];
  cardClass: string;
}) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<'all' | LegalToolCategory>('all');

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return tools.filter((t) => {
      const matchCategory = cat === 'all' ? true : t.category === cat;
      if (!matchCategory) return false;
      if (!query) return true;
      return (
        t.name.toLowerCase().includes(query) ||
        t.slug.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query)
      );
    });
  }, [tools, q, cat]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search legal tools (e.g. privacy, cookie, terms)"
            className="w-full sm:max-w-md rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white"
          />
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value as 'all' | LegalToolCategory)}
            className="w-full sm:w-56 rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
          {filtered.length} tools
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((t) => (
          <article key={t.slug} className={cardClass}>
            <div className="mb-3">
              <span className="inline-flex items-center rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300">
                {getLegalToolCategoryLabel(t.category)}
              </span>
            </div>
            <h2 className="mb-2 text-lg font-bold text-gray-800 dark:text-white/90">
              {t.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-6 flex-1">
              {t.description}
            </p>
            <Link
              href={`/${t.slug}`}
              className="mt-4 inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition w-fit"
            >
              Open generator
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

