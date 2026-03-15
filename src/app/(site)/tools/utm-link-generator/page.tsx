'use client';

import { useMemo, useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ToolExample, ToolFaq } from '@/components/tools/ToolSeoBlocks';

export default function UtmLinkGeneratorPage() {
  const [url, setUrl] = useState('https://example.com/landing');
  const [utmSource, setUtmSource] = useState('newsletter');
  const [utmMedium, setUtmMedium] = useState('email');
  const [utmCampaign, setUtmCampaign] = useState('spring-sale');
  const [utmTerm, setUtmTerm] = useState('');
  const [utmContent, setUtmContent] = useState('');

  const result = useMemo(() => {
    const base = url.trim() || 'https://example.com';
    const u = new URL(base.startsWith('http') ? base : `https://${base}`);
    if (utmSource.trim()) u.searchParams.set('utm_source', utmSource.trim());
    if (utmMedium.trim()) u.searchParams.set('utm_medium', utmMedium.trim());
    if (utmCampaign.trim()) u.searchParams.set('utm_campaign', utmCampaign.trim());
    if (utmTerm.trim()) u.searchParams.set('utm_term', utmTerm.trim());
    if (utmContent.trim()) u.searchParams.set('utm_content', utmContent.trim());
    return u.toString();
  }, [url, utmSource, utmMedium, utmCampaign, utmTerm, utmContent]);

  return (
    <ToolLayout
      title="UTM Link Generator"
      description="Add UTM parameters to URLs for campaign tracking."
      slug="utm-link-generator"
      whatIs={
        <>
          <p>Build trackable links by adding utm_source, utm_medium, utm_campaign, and optional utm_term and utm_content.</p>
          <ToolFaq />
        </>
      }
      howToUse={
        <ol className="list-decimal pl-5 space-y-1">
          <li>Enter your base URL</li>
          <li>Fill in UTM parameters (source, medium, campaign required)</li>
          <li>Copy the generated URL</li>
        </ol>
      }
      exampleUsage={<ToolExample input="https://example.com, source=newsletter" output="https://example.com?utm_source=newsletter&..." />}
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Base URL</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90"
            placeholder="https://example.com/page"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">utm_source</label>
            <input type="text" value={utmSource} onChange={(e) => setUtmSource(e.target.value)} className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90" placeholder="google" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">utm_medium</label>
            <input type="text" value={utmMedium} onChange={(e) => setUtmMedium(e.target.value)} className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90" placeholder="cpc" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">utm_campaign</label>
            <input type="text" value={utmCampaign} onChange={(e) => setUtmCampaign(e.target.value)} className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90" placeholder="summer" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">utm_term (optional)</label>
            <input type="text" value={utmTerm} onChange={(e) => setUtmTerm(e.target.value)} className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">utm_content (optional)</label>
            <input type="text" value={utmContent} onChange={(e) => setUtmContent(e.target.value)} className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90" />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Generated URL</label>
          <pre className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200 break-all">
            {result}
          </pre>
        </div>
      </div>
    </ToolLayout>
  );
}
