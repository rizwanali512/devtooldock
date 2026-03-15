'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ToolExample, ToolFaq } from '@/components/tools/ToolSeoBlocks';

const SNIPPETS = [
  {
    name: 'Force HTTPS',
    code: `# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]`,
  },
  {
    name: 'Force WWW',
    code: `# Force www
RewriteEngine On
RewriteCond %{HTTP_HOST} !^www\\. [NC]
RewriteRule ^(.*)$ https://www.%{HTTP_HOST}/$1 [R=301,L]`,
  },
  {
    name: 'Remove trailing slash',
    code: `# Remove trailing slash
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)/$ /$1 [R=301,L]`,
  },
  {
    name: 'Custom 404',
    code: `# Custom 404
ErrorDocument 404 /404.html`,
  },
  {
    name: 'Deny directory listing',
    code: `# Disable directory listing
Options -Indexes`,
  },
  {
    name: 'Protect .htaccess',
    code: `# Protect this file
<Files .htaccess>
  Require all denied
</Files>`,
  },
];

export default function HtaccessGeneratorPage() {
  const [selected, setSelected] = useState(0);

  return (
    <ToolLayout
      title="Htaccess Generator"
      description="Generate common .htaccess snippets for Apache."
      slug="htaccess-generator"
      whatIs={
        <>
          <p>Copy common Apache .htaccess snippets: force HTTPS, force WWW, remove trailing slash, custom 404, and security options.</p>
          <ToolFaq />
        </>
      }
      howToUse={
        <ol className="list-decimal pl-5 space-y-1">
          <li>Select a snippet from the list</li>
          <li>Copy the code into your .htaccess file</li>
        </ol>
      }
      exampleUsage={<ToolExample input="Force HTTPS" output="RewriteRule ..." />}
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Snippet</label>
          <div className="flex flex-wrap gap-2">
            {SNIPPETS.map((s, i) => (
              <button
                key={s.name}
                type="button"
                onClick={() => setSelected(i)}
                className={`rounded-xl border px-3 py-2 text-sm ${selected === i ? 'border-gray-900 dark:border-white bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-white/10'}`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Code</label>
          <pre className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            {SNIPPETS[selected].code}
          </pre>
        </div>
      </div>
    </ToolLayout>
  );
}
