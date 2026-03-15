'use client';

import { useMemo, useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';

export default function MetaTagGeneratorPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [image, setImage] = useState('');

  const output = useMemo(() => {
    const t = title.trim();
    const d = description.trim();
    const u = url.trim();
    const img = image.trim();
    const lines: string[] = [];
    if (t) lines.push(`<title>${t}</title>`);
    if (d) lines.push(`<meta name="description" content="${d.replace(/"/g, '&quot;')}" />`);
    if (u) lines.push(`<link rel="canonical" href="${u}" />`);
    if (t) lines.push(`<meta property="og:title" content="${t.replace(/"/g, '&quot;')}" />`);
    if (d) lines.push(`<meta property="og:description" content="${d.replace(/"/g, '&quot;')}" />`);
    if (u) lines.push(`<meta property="og:url" content="${u}" />`);
    lines.push(`<meta property="og:type" content="website" />`);
    if (img) lines.push(`<meta property="og:image" content="${img}" />`);
    if (t) lines.push(`<meta name="twitter:card" content="summary_large_image" />`);
    if (t) lines.push(`<meta name="twitter:title" content="${t.replace(/"/g, '&quot;')}" />`);
    if (d) lines.push(`<meta name="twitter:description" content="${d.replace(/"/g, '&quot;')}" />`);
    if (img) lines.push(`<meta name="twitter:image" content="${img}" />`);
    return lines.join('\n');
  }, [title, description, url, image]);

  return (
    <ToolLayout
      title="Meta Tag Generator"
      description="Generate common SEO + social meta tags (Open Graph + Twitter)."
      slug="meta-tag-generator"
      whatIs={<p>Meta tags help search engines and social platforms understand your page. This generator creates a basic set you can paste into your HTML head.</p>}
      exampleUsage={<p>Fill in title/description/URL and copy the generated tags into your page’s <code>&lt;head&gt;</code>.</p>}
      howToUse={
        <>
          <p className="mb-2">1. Enter page title, description, canonical URL, and optional image URL.</p>
          <p>2. Copy the generated meta tags.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Page Title"
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Canonical URL</label>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/page"
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A short summary of the page."
            rows={4}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL (optional)</label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/og-image.png"
            className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Generated tags</label>
          <Textarea value={output} readOnly rows={10} className="font-mono text-sm" />
        </div>
      </div>
    </ToolLayout>
  );
}

