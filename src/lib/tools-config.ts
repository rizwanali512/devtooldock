import { tools } from '@/lib/tools';
import { getRelatedTools as getRelatedToolsImpl } from '@/lib/getRelatedTools';

export const TOOLS = tools;

export type ToolSlug = (typeof TOOLS)[number]['slug'];

export function getToolBySlug(slug: string) {
  return TOOLS.find((t) => t.slug === slug);
}

/** Re-export for backward compatibility. Uses same-category + fallback, returns 4–6 tools. */
export function getRelatedTools(slug: string) {
  return getRelatedToolsImpl(slug);
}
