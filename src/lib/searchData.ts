import { tools } from '@/lib/tools';
import { aiTools } from '@/lib/ai-tools';
import { legalTools } from '@/lib/legalTools';

export type SearchCategory = 'developer' | 'ai' | 'legal';

export type SearchItem = {
  name: string;
  slug: string;
  category: SearchCategory;
};

export const searchItems: SearchItem[] = [
  ...tools.map((t) => ({
    name: t.name,
    slug: t.slug,
    category: 'developer' as const,
  })),
  ...aiTools.map((t) => ({
    name: t.name,
    slug: `ai/${t.slug}`,
    category: 'ai' as const,
  })),
  ...legalTools.map((t) => ({
    name: t.name,
    slug: t.slug,
    category: 'legal' as const,
  })),
];

