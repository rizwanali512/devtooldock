import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import { aiTools, getAITool } from '@/lib/ai-tools';
import { notFound } from 'next/navigation';

type Props = PropsWithChildren<{
  params: Promise<{ tool: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tool: slug } = await params;
  const tool = getAITool(slug);
  if (!tool) return { title: 'AI Tool' };
  return { title: tool.name };
}

export function generateStaticParams() {
  return aiTools.map((t) => ({ tool: t.slug }));
}

export default async function ToolLayout({ children, params }: Props) {
  const { tool: slug } = await params;
  const tool = getAITool(slug);
  if (!tool) notFound();

  return (
    <main className="flex flex-col flex-1 min-h-0 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 min-h-0">
        <div className="relative flex flex-col flex-1 min-h-0 isolate">
          {children}
        </div>
      </div>
    </main>
  );
}
