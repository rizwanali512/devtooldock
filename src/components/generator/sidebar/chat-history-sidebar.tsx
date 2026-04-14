'use client';

import {
  ApiDocGeneratorIcon,
  CodeGeneratorIcon,
  CodeRefactorIcon,
  CommitMessageGeneratorIcon,
  EmailGeneratorIcon,
  ErrorExplainerIcon,
  RegexGeneratorIcon,
  SearchIcon,
  SqlGeneratorIcon,
  TextGeneratorIcon,
} from '@/icons/icons';
import { getAIToolsBySearch } from '@/lib/ai-tools';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { NewChat } from './new-chat';

type PropsType = {
  isOpen: boolean;
  toggleIsOpen: () => void;
};

export default function RightSidebar({ isOpen, toggleIsOpen }: PropsType) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = useMemo(
    () => getAIToolsBySearch(searchQuery),
    [searchQuery]
  );

  const IconForTool = (slug: string) => {
    switch (slug) {
      case 'text-generator':
        return TextGeneratorIcon;
      case 'code-generator':
        return CodeGeneratorIcon;
      case 'email-generator':
        return EmailGeneratorIcon;
      case 'sql-generator':
        return SqlGeneratorIcon;
      case 'regex-generator':
        return RegexGeneratorIcon;
      case 'commit-message-generator':
        return CommitMessageGeneratorIcon;
      case 'api-doc-generator':
        return ApiDocGeneratorIcon;
      case 'error-explainer':
        return ErrorExplainerIcon;
      case 'code-refactor':
        return CodeRefactorIcon;
      default:
        return TextGeneratorIcon;
    }
  };

  return (
    <aside
      className={`max-xl:absolute inset-y-0 right-0 z-50 min-w-[288px] max-w-[288px] bg-white dark:bg-dark-primary border-l border-gray-100 dark:border-gray-800 transform transition-transform duration-300 ease-in-out xl:translate-x-0 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-6 flex flex-col gap-6 h-full">
        <div className="space-y-4">
          <NewChat toggleSidebar={toggleIsOpen} />

          <div className="relative">
            <input
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2.5 px-4 pr-12 dark:text-white border border-gray-200 rounded-full dark:bg-dark-primary bg-white text-sm placeholder:text-sm placeholder:text-gray-500 dark:border-gray-700 dark:placeholder:text-white/30 shadow-xs focus-visible:border-primary-300 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-dark-primary"
            />

            <SearchIcon className="absolute right-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto custom-scrollbar space-y-1">
          <h2 className="text-xs font-medium text-gray-400 dark:text-gray-400 capitalize tracking-wider mb-3">
            AI Tools
          </h2>
          {filteredTools.map((tool) => (
            (() => {
              const Icon = IconForTool(tool.slug);
              return (
            <Link
              key={tool.slug}
              href={`/ai/${tool.slug}`}
              onClick={toggleIsOpen}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-800 dark:hover:text-white/90 transition"
            >
              <Icon className="size-7 shrink-0" />
              {tool.name}
            </Link>
              );
            })()
          ))}
          {filteredTools.length === 0 && (
            <p className="px-3 py-2 text-sm text-gray-400 dark:text-gray-500">
              No tools match your search.
            </p>
          )}
        </nav>
      </div>
    </aside>
  );
}
