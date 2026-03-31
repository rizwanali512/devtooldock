'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { searchItems, type SearchItem } from '@/lib/searchData';
import { SearchIcon } from '@/icons/icons';
import { cn } from '@/lib/utils';

function labelForCategory(cat: SearchItem['category']) {
  if (cat === 'developer') return 'Developer';
  if (cat === 'ai') return 'AI';
  return 'Legal';
}

function tagClass(cat: SearchItem['category']) {
  switch (cat) {
    case 'developer':
      return 'border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-white/5';
    case 'ai':
      return 'border-primary-200 dark:border-primary-500/30 text-primary-700 dark:text-primary-200 bg-primary-50/60 dark:bg-primary-500/10';
    case 'legal':
      return 'border-amber-200 dark:border-amber-500/30 text-amber-700 dark:text-amber-200 bg-amber-50/60 dark:bg-amber-500/10';
  }
}

export default function HeaderSearch({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  const results = useMemo(() => {
    const q = debounced.toLowerCase();
    if (!q) return [];
    return searchItems
      .filter((item) => item.name.toLowerCase().includes(q))
      .slice(0, 8);
  }, [debounced]);

  useEffect(() => {
    setOpen(debounced.length > 0);
    setActiveIndex(0);
  }, [debounced]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = e.target as Node | null;
      if (!el) return;
      if (wrapperRef.current && !wrapperRef.current.contains(el)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  useEffect(() => {
    // Close on navigation
    setOpen(false);
    setQuery('');
    setDebounced('');
  }, [pathname]);

  const go = (item: SearchItem) => {
    router.push(`/${item.slug}`);
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className={cn('relative w-full', className)}>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <SearchIcon />
        </span>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(debounced.length > 0)}
          onKeyDown={(e) => {
            if (!open) return;
            if (e.key === 'Escape') {
              setOpen(false);
              return;
            }
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setActiveIndex((i) => Math.min(i + 1, Math.max(0, results.length - 1)));
              return;
            }
            if (e.key === 'ArrowUp') {
              e.preventDefault();
              setActiveIndex((i) => Math.max(i - 1, 0));
              return;
            }
            if (e.key === 'Enter') {
              e.preventDefault();
              const first = results[activeIndex] ?? results[0];
              if (first) go(first);
              return;
            }
          }}
          type="text"
          placeholder="Search tools..."
          className="w-full h-10 pl-9 pr-3 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-dark-primary focus-visible:border-primary-300 text-sm text-gray-800 dark:text-white/90 placeholder:text-gray-400"
        />
      </div>

      {open ? (
        <div className="absolute left-0 right-0 mt-2 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-secondary shadow-theme-lg p-2 z-50">
          {results.length > 0 ? (
            <div className="space-y-1">
              {results.map((item, idx) => (
                <button
                  key={`${item.category}-${item.slug}`}
                  type="button"
                  onClick={() => go(item)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={cn(
                    'w-full text-left flex items-center justify-between gap-3 px-3 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 transition',
                    'focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-dark-primary',
                    idx === activeIndex && 'bg-gray-50 dark:bg-white/5'
                  )}
                >
                  <span className="truncate">{item.name}</span>
                  <span
                    className={cn(
                      'shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full border',
                      tagClass(item.category)
                    )}
                  >
                    {labelForCategory(item.category)}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-3 py-3 text-sm text-gray-500 dark:text-gray-400">
              No results found
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

