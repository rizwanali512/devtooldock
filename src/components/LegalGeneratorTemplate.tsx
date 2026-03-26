'use client';

import { useMemo, useState } from 'react';
import { CopyToClipboard } from '@/components/copy-to-clipboard';
import type { LegalTool } from '@/lib/legalTools';
import type { LegalFormData, LegalDocType } from '@/lib/generateLegalDoc';
import { generateLegalDoc } from '@/lib/generateLegalDoc';

type Props = {
  tool: LegalTool;
};

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

function validateStep1(toolSlug: string, data: LegalFormData): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.websiteName.trim()) errors.websiteName = 'Website name is required.';
  if (!data.websiteUrl.trim()) errors.websiteUrl = 'Website URL is required.';
  if (!data.country.trim()) errors.country = 'Country is required.';

  const needsContactEmail = [
    'privacy-policy-generator',
    'terms-and-conditions-generator',
    'refund-policy-generator',
  ].includes(toolSlug);

  if (needsContactEmail) {
    const email = String(data.contactEmail ?? '').trim();
    if (!email) errors.contactEmail = 'Contact email is required.';
    else if (!isValidEmail(email)) errors.contactEmail = 'Enter a valid email address.';
  }

  if (toolSlug === 'refund-policy-generator') {
    const days = data.refundDays;
    const n = typeof days === 'number' ? days : days === '' ? NaN : Number(days);
    if (!Number.isFinite(n) || n <= 0) errors.refundDays = 'Refund days must be a positive number.';
  }

  if (toolSlug === 'eula-generator') {
    if (!String(data.softwareName ?? '').trim()) errors.softwareName = 'Software name is required.';
    if (!String(data.licenseType ?? '').trim()) errors.licenseType = 'License type is required.';
  }
  if (toolSlug === 'affiliate-disclosure-generator') {
    if (!String(data.affiliateNetworks ?? '').trim())
      errors.affiliateNetworks = 'Affiliate networks are required.';
  }
  if (toolSlug === 'dmca-policy-generator') {
    const email = String(data.dmcaContactEmail ?? '').trim();
    if (!email) errors.dmcaContactEmail = 'Contact email is required.';
    else if (!isValidEmail(email)) errors.dmcaContactEmail = 'Enter a valid email address.';
  }
  if (toolSlug === 'acceptable-use-policy-generator') {
    if (!String(data.serviceName ?? '').trim()) errors.serviceName = 'Service name is required.';
  }
  if (toolSlug === 'saas-terms-generator') {
    if (!String(data.serviceName ?? '').trim()) errors.serviceName = 'Service name is required.';
    if (!String(data.billingModel ?? '').trim()) errors.billingModel = 'Billing model is required.';
  }

  return errors;
}

function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function LegalGeneratorTemplate({ tool }: Props) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<LegalFormData>({
    websiteName: '',
    websiteUrl: '',
    country: '',
    collectEmails: false,
    useCookies: false,
    useAnalytics: false,
    contactEmail: '',
    softwareName: '',
    licenseType: '',
    affiliateNetworks: '',
    dmcaContactEmail: '',
    serviceName: '',
    billingModel: '',
    refundDays: 14,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [output, setOutput] = useState('');

  const docType = tool.slug as LegalDocType;

  const filename = useMemo(() => {
    const safe = tool.slug.replace(/[^a-z0-9-]/gi, '-').toLowerCase();
    return `${safe}.txt`;
  }, [tool.slug]);

  function nextFromStep1() {
    const e = validateStep1(tool.slug, form);
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setStep(2);
  }

  function generate() {
    const e = validateStep1(tool.slug, form);
    setErrors(e);
    if (Object.keys(e).length > 0) {
      setStep(1);
      return;
    }
    const doc = generateLegalDoc(docType, form);
    setOutput(doc);
    setStep(3);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="w-full text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white/90">
            {tool.name}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Free online generator for a quick policy draft.
          </p>
        </div>
        {output ? (
          <div className="flex flex-wrap items-center gap-2">
            <CopyToClipboard text={output} toastMessage="Copied to clipboard" />
            <button
              type="button"
              onClick={() => downloadTextFile(filename, output)}
              className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
            >
              Download .txt
            </button>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        <span
          className={`px-3 py-1.5 rounded-full border ${
            step === 1
              ? 'border-primary-300 text-primary-600 dark:text-primary-400'
              : 'border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400'
          }`}
        >
          Step 1: Site details
        </span>
        <span
          className={`px-3 py-1.5 rounded-full border ${
            step === 2
              ? 'border-primary-300 text-primary-600 dark:text-primary-400'
              : 'border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400'
          }`}
        >
          Step 2: Data usage
        </span>
        <span
          className={`px-3 py-1.5 rounded-full border ${
            step === 3
              ? 'border-primary-300 text-primary-600 dark:text-primary-400'
              : 'border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400'
          }`}
        >
          Step 3: Generate
        </span>
      </div>

      {step === 1 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Website name
            </label>
            <input
              value={form.websiteName}
              onChange={(e) => setForm((p) => ({ ...p, websiteName: e.target.value }))}
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white"
              placeholder="e.g. DevToolDock"
            />
            {errors.websiteName ? (
              <p className="mt-1 text-xs text-error-600">{errors.websiteName}</p>
            ) : null}
          </div>
          <div className="sm:col-span-1">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Website URL
            </label>
            <input
              value={form.websiteUrl}
              onChange={(e) => setForm((p) => ({ ...p, websiteUrl: e.target.value }))}
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white"
              placeholder="e.g. https://example.com"
            />
            {errors.websiteUrl ? (
              <p className="mt-1 text-xs text-error-600">{errors.websiteUrl}</p>
            ) : null}
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Country
            </label>
            <input
              value={form.country}
              onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))}
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white"
              placeholder="e.g. United States"
            />
            {errors.country ? (
              <p className="mt-1 text-xs text-error-600">{errors.country}</p>
            ) : null}
          </div>

          {['privacy-policy-generator', 'terms-and-conditions-generator', 'refund-policy-generator'].includes(
            tool.slug
          ) ? (
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Contact email
              </label>
              <input
                value={String(form.contactEmail ?? '')}
                onChange={(e) => setForm((p) => ({ ...p, contactEmail: e.target.value }))}
                className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white"
                placeholder="e.g. support@example.com"
              />
              {errors.contactEmail ? (
                <p className="mt-1 text-xs text-error-600">{errors.contactEmail}</p>
              ) : null}
            </div>
          ) : null}

          {tool.slug === 'refund-policy-generator' ? (
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Refund window (days)
              </label>
              <input
                type="number"
                min={1}
                value={String(form.refundDays ?? '')}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    refundDays: e.target.value === '' ? '' : Number(e.target.value),
                  }))
                }
                className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white"
                placeholder="e.g. 14"
              />
              {errors.refundDays ? (
                <p className="mt-1 text-xs text-error-600">{errors.refundDays}</p>
              ) : null}
            </div>
          ) : null}

          {tool.slug === 'eula-generator' ? (
            <>
              <div className="sm:col-span-1">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Software name
                </label>
                <input
                  value={form.softwareName ?? ''}
                  onChange={(e) => setForm((p) => ({ ...p, softwareName: e.target.value }))}
                  className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white"
                  placeholder="e.g. DevToolDock App"
                />
                {errors.softwareName ? (
                  <p className="mt-1 text-xs text-error-600">{errors.softwareName}</p>
                ) : null}
              </div>
              <div className="sm:col-span-1">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  License type
                </label>
                <select
                  value={form.licenseType ?? ''}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, licenseType: e.target.value as LegalFormData['licenseType'] }))
                  }
                  className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white"
                >
                  <option value="">Select</option>
                  <option value="perpetual">Perpetual</option>
                  <option value="subscription">Subscription</option>
                  <option value="open-source">Open-source</option>
                </select>
                {errors.licenseType ? (
                  <p className="mt-1 text-xs text-error-600">{errors.licenseType}</p>
                ) : null}
              </div>
            </>
          ) : null}

          {tool.slug === 'affiliate-disclosure-generator' ? (
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Affiliate networks used
              </label>
              <input
                value={form.affiliateNetworks ?? ''}
                onChange={(e) => setForm((p) => ({ ...p, affiliateNetworks: e.target.value }))}
                className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white"
                placeholder="e.g. Amazon Associates, Impact, PartnerStack"
              />
              {errors.affiliateNetworks ? (
                <p className="mt-1 text-xs text-error-600">{errors.affiliateNetworks}</p>
              ) : null}
            </div>
          ) : null}

          {tool.slug === 'dmca-policy-generator' ? (
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                DMCA contact email
              </label>
              <input
                value={form.dmcaContactEmail ?? ''}
                onChange={(e) => setForm((p) => ({ ...p, dmcaContactEmail: e.target.value }))}
                className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white"
                placeholder="e.g. dmca@example.com"
              />
              {errors.dmcaContactEmail ? (
                <p className="mt-1 text-xs text-error-600">{errors.dmcaContactEmail}</p>
              ) : null}
            </div>
          ) : null}

          {tool.slug === 'acceptable-use-policy-generator' ? (
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Service name
              </label>
              <input
                value={form.serviceName ?? ''}
                onChange={(e) => setForm((p) => ({ ...p, serviceName: e.target.value }))}
                className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white"
                placeholder="e.g. DevToolDock"
              />
              {errors.serviceName ? (
                <p className="mt-1 text-xs text-error-600">{errors.serviceName}</p>
              ) : null}
            </div>
          ) : null}

          {tool.slug === 'saas-terms-generator' ? (
            <>
              <div className="sm:col-span-1">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Service name
                </label>
                <input
                  value={form.serviceName ?? ''}
                  onChange={(e) => setForm((p) => ({ ...p, serviceName: e.target.value }))}
                  className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white"
                  placeholder="e.g. DevToolDock"
                />
                {errors.serviceName ? (
                  <p className="mt-1 text-xs text-error-600">{errors.serviceName}</p>
                ) : null}
              </div>
              <div className="sm:col-span-1">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Billing model
                </label>
                <select
                  value={form.billingModel ?? ''}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, billingModel: e.target.value as LegalFormData['billingModel'] }))
                  }
                  className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white"
                >
                  <option value="">Select</option>
                  <option value="subscription">Subscription</option>
                  <option value="one-time">One-time</option>
                  <option value="usage-based">Usage-based</option>
                </select>
                {errors.billingModel ? (
                  <p className="mt-1 text-xs text-error-600">{errors.billingModel}</p>
                ) : null}
              </div>
            </>
          ) : null}

          <div className="sm:col-span-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={nextFromStep1}
              className="px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition"
            >
              Continue
            </button>
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={form.collectEmails}
                onChange={(e) => setForm((p) => ({ ...p, collectEmails: e.target.checked }))}
              />
              Do you collect emails?
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={form.useCookies}
                onChange={(e) => setForm((p) => ({ ...p, useCookies: e.target.checked }))}
              />
              Do you use cookies?
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={form.useAnalytics}
                onChange={(e) => setForm((p) => ({ ...p, useAnalytics: e.target.checked }))}
              />
              Do you use analytics?
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
            >
              Back
            </button>
            <button
              type="button"
              onClick={generate}
              className="px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition"
            >
              Generate document
            </button>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white/90">Generated document</h2>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
              >
                Edit answers
              </button>
              {output ? (
                <button
                  type="button"
                  onClick={() => downloadTextFile(filename, output)}
                  className="px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition"
                >
                  Download .txt
                </button>
              ) : null}
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4">
            <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 leading-6">
              {output || 'No document generated yet.'}
            </pre>
          </div>
        </div>
      ) : null}
    </div>
  );
}

