export type LegalFormData = {
  websiteName: string;
  websiteUrl: string;
  country: string;
  collectEmails: boolean;
  useCookies: boolean;
  useAnalytics: boolean;
  contactEmail?: string;
  softwareName?: string;
  licenseType?: 'perpetual' | 'subscription' | 'open-source' | '';
  affiliateNetworks?: string;
  dmcaContactEmail?: string;
  serviceName?: string;
  billingModel?: 'subscription' | 'one-time' | 'usage-based' | '';
  refundDays?: number | '';
};

export type LegalDocType =
  | 'privacy-policy-generator'
  | 'terms-and-conditions-generator'
  | 'cookie-policy-generator'
  | 'refund-policy-generator'
  | 'disclaimer-generator'
  | 'eula-generator'
  | 'affiliate-disclosure-generator'
  | 'dmca-policy-generator'
  | 'acceptable-use-policy-generator'
  | 'saas-terms-generator';

const DISCLAIMER =
  'This document is for informational purposes only and does not constitute legal advice.';

function normalizeUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function fmtDate(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

type PlaceholderMap = Record<string, string>;

function replacePlaceholders(template: string, map: PlaceholderMap): string {
  return template.replace(/\{\{\s*([a-z0-9_]+)\s*\}\}/gi, (_, key: string) => map[key] ?? '');
}

function joinSections(sections: string[]): string {
  return sections
    .map((s) => s.trim())
    .filter(Boolean)
    .join('\n\n');
}

function buildPlaceholderMap(data: LegalFormData): PlaceholderMap {
  const url = normalizeUrl(data.websiteUrl) || data.websiteUrl;
  const email = (data.contactEmail ?? '').trim() || (data.dmcaContactEmail ?? '').trim();
  const softwareName = (data.softwareName ?? '').trim() || data.websiteName;
  const productName = (data.serviceName ?? '').trim() || data.websiteName;
  const refundDays = String(
    typeof data.refundDays === 'number' ? data.refundDays : data.refundDays ? Number(data.refundDays) : 14
  );

  return {
    website_name: data.websiteName,
    website_url: url,
    email: email || 'support@example.com',
    date: fmtDate(),
    software_name: softwareName,
    product_name: productName,
    days: refundDays,
  };
}

export function generatePrivacyPolicy(data: LegalFormData): string {
  const map = buildPlaceholderMap(data);
  const template = [
    'Privacy Policy',
    '',
    'Effective Date: {{date}}',
    '',
    'At {{website_name}}, accessible from {{website_url}}, we prioritize your privacy. This Privacy Policy outlines the types of information we collect and how we use it.',
    '',
    'Information We Collect',
    data.collectEmails
      ? 'We may collect personal information such as your name, email address, and any data you voluntarily provide.'
      : 'We may collect limited personal information you voluntarily provide (for example via contact requests).',
    '',
    'How We Use Information',
    'We use collected data to:',
    '• Provide and maintain our services',
    '• Improve user experience',
    '• Communicate updates',
    '',
    'Cookies',
    data.useCookies
      ? 'We use cookies to store user preferences and enhance browsing experience.'
      : 'We do not intentionally use cookies for core functionality. Some third-party services may still set cookies depending on configuration.',
    '',
    'Third-Party Services',
    data.useAnalytics
      ? 'We may use third-party services like analytics tools that collect data.'
      : 'We do not intentionally use analytics tools for usage measurement.',
    '',
    'Contact Us',
    'If you have any questions, contact us at {{email}}.',
    '',
    'Disclaimer',
    DISCLAIMER,
  ].join('\n');
  return replacePlaceholders(template, map).trim();
}

export function generateTerms(data: LegalFormData): string {
  const map = buildPlaceholderMap(data);
  const template = [
    'Terms and Conditions',
    '',
    'Effective Date: {{date}}',
    '',
    'By accessing {{website_name}}, you agree to these terms.',
    '',
    'Use of Service',
    'You agree to use this website only for lawful purposes.',
    '',
    'Intellectual Property',
    'All content on this site is owned by {{website_name}}.',
    '',
    'User Responsibilities',
    'You must not misuse the service or attempt unauthorized access.',
    '',
    'Limitation of Liability',
    'We are not liable for any damages arising from use of the service.',
    '',
    'Changes',
    'We may update these terms at any time.',
    '',
    'Contact',
    '{{email}}',
    '',
    'Disclaimer',
    'This is not legal advice.',
  ].join('\n');
  return replacePlaceholders(template, map).trim();
}

export function generateCookiePolicy(data: LegalFormData): string {
  const map = buildPlaceholderMap(data);
  const template = [
    'Cookie Policy',
    '',
    'This website uses cookies to improve user experience.',
    '',
    'What Are Cookies',
    'Cookies are small text files stored on your device.',
    '',
    'How We Use Cookies',
    data.useCookies
      ? '• Remember preferences\n• Analyze traffic\n• Improve performance'
      : '• Remember preferences (if enabled)\n• Improve performance (if enabled)',
    '',
    'Third-Party Cookies',
    data.useAnalytics
      ? 'We may use analytics tools that set cookies.'
      : 'We do not intentionally use analytics tools that set cookies.',
    '',
    'Managing Cookies',
    'You can disable cookies via browser settings.',
    '',
    'Disclaimer',
    'This is for informational purposes only.',
  ].join('\n');
  return replacePlaceholders(template, map).trim();
}

export function generateRefundPolicy(data: LegalFormData): string {
  const map = buildPlaceholderMap(data);
  const template = [
    'Refund Policy',
    '',
    'At {{website_name}}, we strive for customer satisfaction.',
    '',
    'Eligibility',
    'Refunds are available within {{days}} days of purchase.',
    '',
    'Non-Refundable Items',
    'Certain services may not be refundable.',
    '',
    'Process',
    'To request a refund, contact {{email}}.',
    '',
    'Approval',
    'Refunds will be processed after review.',
    '',
    'Disclaimer',
    'Not legal advice.',
  ].join('\n');
  return replacePlaceholders(template, map).trim();
}

export function generateDisclaimer(data: LegalFormData): string {
  const map = buildPlaceholderMap(data);
  const template = [
    'Disclaimer',
    '',
    'The information provided by {{website_name}} is for general informational purposes only.',
    '',
    'No Professional Advice',
    'Content is not intended as legal, financial, or professional advice.',
    '',
    'External Links',
    'We are not responsible for third-party content.',
    '',
    'Use at Your Own Risk',
    'Users rely on information at their own risk.',
    '',
    'Disclaimer',
    'This document is not legal advice.',
  ].join('\n');
  return replacePlaceholders(template, map).trim();
}

export function generateEULA(data: LegalFormData): string {
  const map = buildPlaceholderMap(data);
  const template = [
    'End User License Agreement (EULA)',
    '',
    'This agreement governs the use of {{software_name}}.',
    '',
    'License Grant',
    'You are granted a non-exclusive license to use the software.',
    '',
    'Restrictions',
    'You may not modify, distribute, or reverse engineer the software.',
    '',
    'Termination',
    'We may terminate access if terms are violated.',
    '',
    'Disclaimer',
    'Software is provided "as is".',
    '',
    'Not legal advice.',
  ].join('\n');
  return replacePlaceholders(template, map).trim();
}

export function generateAffiliateDisclosure(data: LegalFormData): string {
  const map = buildPlaceholderMap(data);
  const template = [
    'Affiliate Disclosure',
    '',
    '{{website_name}} may contain affiliate links.',
    '',
    'We may earn a commission when users click on these links.',
    'This comes at no extra cost to you.',
    '',
    'We only recommend products we trust.',
    '',
    'Disclaimer',
    'Not legal advice.',
  ].join('\n');
  return replacePlaceholders(template, map).trim();
}

export function generateDMCA(data: LegalFormData): string {
  const map = buildPlaceholderMap(data);
  const template = [
    'DMCA Policy',
    '',
    'We respect intellectual property rights.',
    '',
    'Reporting Infringement',
    'If you believe content infringes your copyright, contact {{email}}.',
    '',
    'Include:',
    '• Your name',
    '• Description of copyrighted work',
    '• URL of infringing content',
    '',
    'We will respond promptly.',
    '',
    'Disclaimer',
    'Not legal advice.',
  ].join('\n');
  return replacePlaceholders(template, map).trim();
}

export function generateAcceptableUse(data: LegalFormData): string {
  const map = buildPlaceholderMap(data);
  const template = [
    'Acceptable Use Policy',
    '',
    'Users agree not to:',
    '',
    '• Violate laws',
    '• Upload harmful content',
    '• Attempt unauthorized access',
    '',
    'We reserve the right to suspend accounts.',
    '',
    'Disclaimer',
    'Not legal advice.',
  ].join('\n');
  return replacePlaceholders(template, map).trim();
}

export function generateSaaSTerms(data: LegalFormData): string {
  const map = buildPlaceholderMap(data);
  const template = [
    'SaaS Terms of Service',
    '',
    'This agreement governs use of {{product_name}}.',
    '',
    'Access',
    'We grant access to the platform under these terms.',
    '',
    'Subscription',
    'Users may be billed periodically.',
    '',
    'Data',
    'We do not own user data.',
    '',
    'Termination',
    'Accounts may be suspended for violations.',
    '',
    'Disclaimer',
    'Not legal advice.',
  ].join('\n');
  return replacePlaceholders(template, map).trim();
}

export function generateLegalDoc(type: LegalDocType, data: LegalFormData): string {
  switch (type) {
    case 'privacy-policy-generator':
      return generatePrivacyPolicy(data);
    case 'terms-and-conditions-generator':
      return generateTerms(data);
    case 'cookie-policy-generator':
      return generateCookiePolicy(data);
    case 'refund-policy-generator':
      return generateRefundPolicy(data);
    case 'disclaimer-generator':
      return generateDisclaimer(data);
    case 'eula-generator':
      return generateEULA(data);
    case 'affiliate-disclosure-generator':
      return generateAffiliateDisclosure(data);
    case 'dmca-policy-generator':
      return generateDMCA(data);
    case 'acceptable-use-policy-generator':
      return generateAcceptableUse(data);
    case 'saas-terms-generator':
      return generateSaaSTerms(data);
    default:
      return generatePrivacyPolicy(data);
  }
}

