'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ToolExample, ToolFaq } from '@/components/tools/ToolSeoBlocks';

const DEFAULT_TITLE = 'DevToolDock – Free Developer Tools & AI Utilities';
const DEFAULT_DESC = 'Free, fast developer tools: JSON formatter, Base64 encoder, regex tester, UUID generator, and more.';
const DEFAULT_IMAGE = '/images/logo.png';
const DEFAULT_URL = 'https://devtooldock.com';

export default function OpenGraphPreviewPage() {
  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [description, setDescription] = useState(DEFAULT_DESC);
  const [image, setImage] = useState(DEFAULT_IMAGE);
  const [url, setUrl] = useState(DEFAULT_URL);

  return (
    <ToolLayout
      title="Open Graph Preview"
      description="Preview how Open Graph meta tags render as a social card."
      slug="open-graph-preview"
      whatIs={
        <>
          <p>Enter og:title, og:description, og:image, and og:url to see how your link might look when shared on social platforms.</p>
          <ToolFaq />
        </>
      }
      howToUse={
        <ol className="list-decimal pl-5 space-y-1">
          <li>Fill in title, description, image URL, and page URL</li>
          <li>Preview updates to match typical OG card layout</li>
        </ol>
      }
      exampleUsage={<ToolExample input="Title + description + image" output="Card preview" />}
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">og:title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90" placeholder="Page title" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">og:description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90" placeholder="Short description" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">og:image (URL)</label>
          <input type="url" value={image} onChange={(e) => setImage(e.target.value)} className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90" placeholder="https://..." />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">og:url</label>
          <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90" placeholder="https://..." />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Card preview</label>
          <div className="max-w-md rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden bg-white dark:bg-gray-900 shadow-lg">
            <div className="aspect-[1.91/1] bg-gray-100 dark:bg-gray-800 relative">
              {image ? (
                <Image src={image} alt="Open graph image preview" fill className="object-cover" unoptimized onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">No image</div>
              )}
            </div>
            <div className="p-3 border-t border-gray-200 dark:border-white/10">
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {(() => {
                try {
                  return new URL(url || 'https://example.com').hostname;
                } catch {
                  return 'example.com';
                }
              })()}
            </p>
              <p className="font-semibold text-gray-900 dark:text-white truncate mt-0.5">{title || 'Title'}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mt-0.5">{description || 'Description'}</p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
