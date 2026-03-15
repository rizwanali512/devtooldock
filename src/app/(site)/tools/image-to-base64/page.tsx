'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';

export default function ImageToBase64Page() {
  const [dataUrl, setDataUrl] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);

  const onPick = async (file: File | null) => {
    if (!file) {
      setDataUrl('');
      setFileName(null);
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => setDataUrl(String(reader.result || ''));
    reader.readAsDataURL(file);
  };

  return (
    <ToolLayout
      title="Image to Base64"
      description="Convert an image file to Base64 (data URL) in the browser."
      slug="image-to-base64"
      whatIs={<p>Converts an uploaded image into a Base64-encoded data URL (e.g. <code>data:image/png;base64,...</code>) which you can embed in HTML/CSS or share.</p>}
      exampleUsage={
        <pre className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm overflow-x-auto">{`Upload: logo.png\nOutput: data:image/png;base64,iVBORw0K...`}</pre>
      }
      howToUse={
        <>
          <p className="mb-2">1. Choose an image file.</p>
          <p className="mb-2">2. The Base64 data URL is generated instantly in your browser.</p>
          <p>3. Copy the output and use it where needed.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Choose an image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onPick(e.target.files?.[0] ?? null)}
            className="block w-full text-sm text-gray-700 dark:text-gray-200 file:mr-4 file:rounded-full file:border-0 file:bg-primary-500 file:px-5 file:py-3 file:text-sm file:font-medium file:text-white hover:file:bg-primary-600"
          />
          {fileName && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Selected: {fileName}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Base64 (data URL)
          </label>
          <pre className="min-h-[120px] w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-all">
            {dataUrl || 'Base64 output will appear here.'}
          </pre>
        </div>

        {dataUrl && (
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Preview
            </label>
            <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={dataUrl} alt="Uploaded preview" className="max-w-full h-auto rounded-xl" />
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}

