'use client';

import { useMemo, useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';

export default function RobotsTxtGeneratorPage() {
  const [allowAll, setAllowAll] = useState(true);
  const [disallowPaths, setDisallowPaths] = useState('/admin\n/api');
  const [sitemap, setSitemap] = useState('');

  const output = useMemo(() => {
    const lines: string[] = [];
    lines.push('User-agent: *');
    if (allowAll) {
      const paths = disallowPaths
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
      if (paths.length === 0) lines.push('Disallow:');
      else paths.forEach((p) => lines.push(`Disallow: ${p.startsWith('/') ? p : '/' + p}`));
    } else {
      lines.push('Disallow: /');
    }
    const sm = sitemap.trim();
    if (sm) lines.push(`\nSitemap: ${sm}`);
    return lines.join('\n');
  }, [allowAll, disallowPaths, sitemap]);

  return (
    <ToolLayout
      title="Robots.txt Generator"
      description="Generate a robots.txt file to guide search engine crawlers."
      slug="robots-txt-generator"
      whatIs={<p><code>robots.txt</code> tells crawlers what parts of your site they can access. It’s a crawling directive (not a security feature).</p>}
      exampleUsage={<p>Disallow sensitive routes (like admin areas) and optionally include your sitemap URL.</p>}
      howToUse={
        <>
          <p className="mb-2">1. Choose whether to allow crawling.</p>
          <p className="mb-2">2. Add disallow paths and an optional sitemap URL.</p>
          <p>3. Copy the generated robots.txt content.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <input type="checkbox" checked={allowAll} onChange={(e) => setAllowAll(e.target.checked)} />
            Allow crawling (recommended)
          </label>
        </div>

        {allowAll && (
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Disallow paths (one per line)
            </label>
            <Textarea
              value={disallowPaths}
              onChange={(e) => setDisallowPaths(e.target.value)}
              rows={5}
              className="font-mono text-sm"
              placeholder="/admin\n/api"
            />
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Sitemap URL (optional)
          </label>
          <input
            value={sitemap}
            onChange={(e) => setSitemap(e.target.value)}
            placeholder="https://example.com/sitemap.xml"
            className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            robots.txt output
          </label>
          <Textarea value={output} readOnly rows={10} className="font-mono text-sm" />
        </div>
      </div>
    </ToolLayout>
  );
}

