'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CopyToClipboard } from '@/components/copy-to-clipboard';

function uuid(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function UuidGeneratorPage() {
  const [list, setList] = useState<string[]>(() => [uuid()]);

  const generate = () => setList((prev) => [uuid(), ...prev].slice(0, 10));

  return (
    <ToolLayout
      title="UUID Generator"
      description="Generate UUID v4 identifiers. Copy with one click."
      slug="uuid-generator"
      whatIs={<p>UUID (Universally Unique Identifier) v4 is a 128-bit value often used as a unique ID. This tool generates new v4 UUIDs using the browser&apos;s secure random source when available.</p>}
      howToUse={
        <>
          <p className="mb-2">1. Click &quot;Generate UUID&quot; to create a new UUID.</p>
          <p>2. The list shows the latest 10. Use Copy to copy any UUID.</p>
        </>
      }
    >
      <div className="space-y-4">
        <button type="button" onClick={generate} className="px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition">
          Generate UUID
        </button>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Generated UUIDs</label>
          <ul className="space-y-2 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4">
            {list.map((id, i) => (
              <li key={`${id}-${i}`} className="flex items-center justify-between gap-2 flex-wrap">
                <code className="text-sm break-all">{id}</code>
                <CopyToClipboard text={id} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
