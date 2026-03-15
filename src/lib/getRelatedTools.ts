import { tools } from '@/lib/tools';
import type { ToolCategory } from '@/lib/tools';

const MIN_RELATED = 4;
const MAX_RELATED = 6;

export type RelatedTool = {
  name: string;
  description: string;
  slug: string;
  href: string;
};

/**
 * Get 4–6 related tools: same category first, then fill from other categories if needed.
 * Works for all current and future tools in lib/tools.ts.
 */
export function getRelatedTools(
  currentSlug: string,
  category?: ToolCategory
): RelatedTool[] {
  const current = tools.find((t) => t.slug === currentSlug);
  const resolvedCategory = category ?? current?.category;
  if (!current || !resolvedCategory) return [];

  const sameCategory = tools.filter(
    (t) => t.category === resolvedCategory && t.slug !== currentSlug
  );
  const otherCategories = tools.filter(
    (t) => t.category !== resolvedCategory && t.slug !== currentSlug
  );

  const combined = [...sameCategory];
  if (combined.length < MAX_RELATED) {
    const needed = Math.min(MAX_RELATED - combined.length, otherCategories.length);
    for (let i = 0; i < needed; i++) {
      combined.push(otherCategories[i]);
    }
  }

  const slice = combined.slice(0, MAX_RELATED);

  return slice.map((t) => ({
    name: t.name,
    description: t.description,
    slug: t.slug,
    href: `/${t.slug}`,
  }));
}
