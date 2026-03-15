'use client';

import { useEffect } from 'react';
import { addRecentTool } from '@/lib/recent-tools-storage';

export function TrackToolVisit({ slug }: { slug: string }) {
  useEffect(() => {
    if (slug) addRecentTool(slug);
  }, [slug]);
  return null;
}
