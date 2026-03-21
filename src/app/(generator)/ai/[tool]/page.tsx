import type { Metadata } from 'next';
import AIToolLayout from '@/components/ai/AIToolLayout';
import { getAITool } from '@/lib/ai-tools';
import { getBaseUrl } from '@/lib/site-url';
import { DEFAULT_KEYWORDS } from '@/lib/seo';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ tool: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tool: slug } = await params;
  const tool = getAITool(slug);
  if (!tool) return { title: 'AI Tool not found' };
  const canonical = getBaseUrl() + '/ai/' + tool.slug;
  const title = `${tool.name} – AI Online Tool`;
  const description =
    tool.slug === 'code-generator'
      ? 'Generate code snippets instantly using AI. Automate development tasks and improve productivity.'
      : `${tool.description} AI-powered developer tool.`;
  return {
    title,
    description,
    keywords: `${tool.name}, ${DEFAULT_KEYWORDS}, ai tools`,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'DevToolDock',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function AIToolPage({ params }: Props) {
  const { tool: slug } = await params;
  const tool = getAITool(slug);
  if (!tool) notFound();

  return <AIToolLayout toolSlug={slug} />;
}
