import 'server-only';

function required(name: string, value: string | undefined): string {
  const v = value?.trim();
  if (!v) throw new Error(`Missing ${name}`);
  return v;
}

function optional(value: string | undefined): string | undefined {
  const v = value?.trim();
  return v ? v : undefined;
}

export const env = {
  // Public (safe to expose, but keep access on server where possible)
  SITE_URL: required('NEXT_PUBLIC_SITE_URL', process.env.NEXT_PUBLIC_SITE_URL),
  SITE_NAME: required('NEXT_PUBLIC_SITE_NAME', process.env.NEXT_PUBLIC_SITE_NAME),
  GA_ID: optional(process.env.NEXT_PUBLIC_GA_ID),

  // Secret (server-only)
  OPENAI_API_KEY: optional(process.env.OPENAI_API_KEY),
} as const;

export function requireOpenAIKey(): string {
  return required('OPENAI_API_KEY', process.env.OPENAI_API_KEY);
}

