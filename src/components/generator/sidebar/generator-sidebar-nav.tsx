'use client';

import { TextGeneratorIcon } from '@/icons/icons';
import { cn } from '@/lib/utils';
import { aiTools } from '@/lib/ai-tools';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function GeneratorSidebarNav() {
  const pathname = usePathname();

  return (
    <div className="px-5 py-6">
      <h2 className="text-xs font-medium text-gray-400 dark:text-gray-400 capitalize tracking-wider">
        Products
      </h2>
      <nav className="mt-3 space-y-1">
        {aiTools.map((tool) => {
          const href = `/ai/${tool.slug}`;
          const isActive = pathname === href || pathname.startsWith(href + '/');

          return (
            <Link
              key={tool.slug}
              href={href}
              className={cn(
                'relative flex gap-1.5 items-center h-11 px-2 py-3 text-sm font-medium rounded-full transition',
                isActive
                  ? 'bg-gray-100 dark:bg-white/5 dark:text-white/90 text-gray-800'
                  : 'dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white/90 text-gray-500 hover:bg-gray-100 hover:text-gray-800'
              )}
            >
              <TextGeneratorIcon className="size-8" />
              {tool.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
