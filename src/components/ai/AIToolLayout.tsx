'use client';

import GeneratorInput from '@/components/generator/generator-input';
import { GradientBlob } from '@/components/gradient-blob';
import { getAITool } from '@/lib/ai-tools';
import { useState } from 'react';
import { AIToolSeoContent } from '@/components/ai/AIToolSeoContent';

type AIToolLayoutProps = {
  toolSlug: string;
  children?: React.ReactNode;
};

export default function AIToolLayout({ toolSlug, children }: AIToolLayoutProps) {
  const [inputValue, setInputValue] = useState('');
  const tool = getAITool(toolSlug);

  if (!tool) return null;

  const showComingSoon = !children;

  return (
    <div className="contents">
      <div className="flex-[1_1_0] overflow-y-auto custom-scrollbar px-5 pt-12 pb-6 md:px-12">
        <div className="text-gray-800 dark:text-white/90 space-y-6 max-w-none prose dark:prose-invert">
          {showComingSoon ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 dark:border-amber-500/60 bg-amber-50 dark:bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-800 dark:text-amber-200 mb-6">
                <span aria-hidden>🚀</span>
                Coming soon
              </div>
              <h2 className="mb-4 font-bold text-gray-800 dark:text-white/90 text-3xl md:text-4xl">
                {tool.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg text-lg">
                This AI tool will {tool.description.toLowerCase()}.
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-md">
                We&apos;re building this feature. Check back later or try another tool from the sidebar.
              </p>

              {/* SEO / indexing content (keeps page valuable even while tool is coming soon) */}
              <div className="mt-10 w-full">
                <AIToolSeoContent
                  toolSlug={tool.slug}
                  toolName={tool.name}
                  toolDescription={tool.description}
                />
              </div>
            </div>
          ) : (
            children
          )}
        </div>
      </div>

      <div className="px-5 md:px-12">
        <form onSubmit={(e) => e.preventDefault()}>
          <GeneratorInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={showComingSoon}
          />
        </form>

        <GradientBlob />
      </div>
    </div>
  );
}
