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

export default function CommandPalette() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return searchItems
      .filter((item) => item.name.toLowerCase().includes(q))
      .slice(0, 10);
  }, [query]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === 'k';
      if ((e.metaKey || e.ctrlKey) && isK) {
        e.preventDefault();
        setOpen(true);
        return;
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    setActiveIndex(0);
    const t = setTimeout(() => inputRef.current?.focus(), 0);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    // Close on navigation
    setOpen(false);
    setQuery('');
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (modalRef.current && !modalRef.current.contains(target)) setOpen(false);
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [open]);

  const go = (item: SearchItem) => {
    router.push(`/${item.slug}`);
    setOpen(false);
    setQuery('');
  };

  return (
    <>
      {/* Mobile trigger button */}
      <button
        type="button"
        aria-label="Open command palette"
        title="Search (⌘K / Ctrl+K)"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-[60] inline-flex md:hidden items-center justify-center size-12 rounded-full bg-white dark:bg-dark-primary border border-gray-200 dark:border-white/10 shadow-theme-lg text-gray-700 dark:text-white/90 hover:bg-gray-50 dark:hover:bg-white/5 transition focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-dark-primary"
      >
        <SearchIcon />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-[2px] flex items-start justify-center px-4 pt-24 md:pt-32"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <div
            ref={modalRef}
            className="w-full max-w-[600px] rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-secondary shadow-theme-lg overflow-hidden transform transition will-change-transform animate-in fade-in zoom-in-95"
          >
            <div className="p-4 border-b border-gray-100 dark:border-gray-800">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <SearchIcon />
                </span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      e.preventDefault();
                      setOpen(false);
                      return;
                    }
                    if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      setActiveIndex((i) =>
                        Math.min(i + 1, Math.max(0, results.length - 1))
                      );
                      return;
                    }
                    if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      setActiveIndex((i) => Math.max(i - 1, 0));
                      return;
                    }
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const item = results[activeIndex] ?? results[0];
                      if (item) go(item);
                    }
                  }}
                  placeholder="Search tools, AI, policies..."
                  className="w-full h-12 pl-10 pr-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-base text-gray-800 dark:text-white/90 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-dark-primary focus-visible:border-primary-300"
                />
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Tip: Press <span className="font-semibold">⌘ K</span> /{' '}
                <span className="font-semibold">Ctrl K</span> to open.
              </p>
            </div>

            <div className="max-h-[55vh] overflow-y-auto custom-scrollbar p-2">
              {query.trim() && results.length === 0 ? (
                <div className="px-3 py-6 text-sm text-gray-500 dark:text-gray-400">
                  No results found
                </div>
              ) : null}

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
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

