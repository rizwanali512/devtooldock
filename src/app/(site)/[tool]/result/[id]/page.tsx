import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getResult } from '@/lib/result-storage';
import { getTool } from '@/lib/tools';
import { getBaseUrl } from '@/lib/site-url';
import { ToolResultView } from './ToolResultView';

type PageProps = {
  params: Promise<{ tool: string; id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tool, id } = await params;
  const canonical = `${getBaseUrl()}/${tool}/result/${id}`;
  return {
    title: 'Shared Result',
    description: 'View shared tool result',
    robots: { index: false, follow: false },
    alternates: { canonical },
  };
}

export default async function ToolResultPage({ params }: PageProps) {
  const { tool: toolSlug, id } = await params;
  const result = getResult(id);
  if (!result || result.toolSlug !== toolSlug) notFound();

  const tool = getTool(toolSlug);
  const toolName = tool?.name ?? toolSlug;

  return (
    <div className="wrapper py-14 md:py-28">
      <div className="max-w-3xl mx-auto">
        <Link
          href={`/${toolSlug}`}
          className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 mb-6"
        >
          ← Back to {toolName}
        </Link>
        <h1 className="mb-2 font-bold text-gray-800 dark:text-white/90 text-2xl md:text-3xl">
          {toolName} – Shared Result
        </h1>
        <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          This is a shareable result. Data is stored temporarily.
        </p>
        <ToolResultView
          input={result.input}
          output={result.output}
          toolSlug={toolSlug}
        />
      </div>
    </div>
  );
}
