'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';

function b64Decode(str: string): string {
  try {
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
    return decodeURIComponent(
      atob(padded)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch {
    return '';
  }
}

export default function JwtDecoderPage() {
  const [input, setInput] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [error, setError] = useState<string | null>(null);

  const decode = () => {
    if (!input.trim()) {
      setHeader('');
      setPayload('');
      setError(null);
      return;
    }
    const parts = input.trim().split('.');
    if (parts.length !== 3) {
      setError('Invalid JWT: expected 3 parts (header.payload.signature)');
      setHeader('');
      setPayload('');
      return;
    }
    try {
      setHeader(JSON.stringify(JSON.parse(b64Decode(parts[0])), null, 2));
      setPayload(JSON.stringify(JSON.parse(b64Decode(parts[1])), null, 2));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to decode');
      setHeader('');
      setPayload('');
    }
  };

  return (
    <ToolLayout
      title="JWT Decoder"
      description="Decode and inspect JWT header and payload. Signature is not verified."
      slug="jwt-decoder"
      whatIs={<p>A JWT has three Base64url-encoded parts: header, payload, and signature. This tool decodes header and payload for inspection only; it does not verify the signature.</p>}
      howToUse={
        <>
          <p className="mb-2">1. Paste your JWT token in the input.</p>
          <p>2. Click Decode. Header and payload will appear as formatted JSON.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">JWT token</label>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} onBlur={decode} placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." rows={3} className="font-mono text-sm" />
        </div>
        <button type="button" onClick={decode} className="px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition">
          Decode
        </button>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Header</label>
            <div className={`min-h-[100px] w-full rounded-2xl border px-4 py-4 text-sm font-mono whitespace-pre-wrap ${error ? 'border-error-500 bg-error-50 dark:bg-error-500/10 text-error-600' : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-800 dark:text-gray-200'}`}>
              {error || header || 'Header will appear here.'}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Payload</label>
            <div className={`min-h-[100px] w-full rounded-2xl border px-4 py-4 text-sm font-mono whitespace-pre-wrap ${error ? 'border-error-500 bg-error-50 dark:bg-error-500/10 text-error-600' : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-800 dark:text-gray-200'}`}>
              {error || payload || 'Payload will appear here.'}
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
