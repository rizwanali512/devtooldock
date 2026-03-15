export const COMPARE_PAGE_SLUGS = [
  'json-formatter-vs-json-validator',
  'regex-tester-vs-regex-generator',
  'base64-encoder-vs-base64-decoder',
] as const;

export type ComparePageSlug = (typeof COMPARE_PAGE_SLUGS)[number];

export type CompareTool = {
  name: string;
  href: string;
};

export type CompareTableRow = {
  aspect: string;
  toolA: string;
  toolB: string;
};

export type CompareFaqItem = {
  question: string;
  answer: string;
};

export type ComparePageConfig = {
  slug: ComparePageSlug;
  title: string;
  metaDescription: string;
  introduction: string;
  tools: [CompareTool, CompareTool];
  comparisonTable: CompareTableRow[];
  faq: CompareFaqItem[];
};

const configs: ComparePageConfig[] = [
  {
    slug: 'json-formatter-vs-json-validator',
    title: 'JSON Formatter vs JSON Validator',
    metaDescription:
      'Compare JSON formatter and JSON validator tools and learn when to use each one.',
    introduction:
      'Both JSON Formatter and JSON Validator help you work with JSON, but they focus on different tasks. A formatter makes JSON readable and can minify it; a validator checks whether your JSON is valid and pinpoints syntax errors. Often you’ll use both: validate first, then format.',
    tools: [
      { name: 'JSON Formatter', href: '/json-formatter' },
      { name: 'JSON Validator', href: '/json-validator' },
    ],
    comparisonTable: [
      {
        aspect: 'Primary purpose',
        toolA: 'Format, beautify, or minify JSON',
        toolB: 'Check if JSON is valid and show errors',
      },
      {
        aspect: 'Output',
        toolA: 'Reformatted or minified JSON',
        toolB: 'Valid / invalid + error message and position',
      },
      {
        aspect: 'Best when',
        toolA: 'You have valid JSON and want it readable or compact',
        toolB: 'You have raw text and need to verify it’s valid JSON',
      },
    ],
    faq: [
      {
        question: 'Should I use JSON Formatter or JSON Validator first?',
        answer:
          'If you’re unsure whether your text is valid JSON, use the JSON Validator first. Once it’s valid, use the JSON Formatter to make it readable or minify it.',
      },
      {
        question: 'Can a JSON Formatter fix invalid JSON?',
        answer:
          'No. A formatter expects valid JSON. Fix syntax errors (e.g. missing quotes, trailing commas) and re-validate with a JSON Validator before formatting.',
      },
    ],
  },
  {
    slug: 'regex-tester-vs-regex-generator',
    title: 'Regex Tester vs Regex Generator',
    metaDescription:
      'Compare regex tester and regex generator: test patterns against text or generate regex from descriptions.',
    introduction:
      'A Regex Tester lets you run a regular expression against sample text and see matches in real time. A Regex Generator (often AI-powered) helps you create a regex from a plain-language description. Use the tester to try and debug patterns; use the generator when you’re not sure how to write the pattern.',
    tools: [
      { name: 'Regex Tester', href: '/regex-tester' },
      { name: 'Regex Generator', href: '/ai/regex-generator' },
    ],
    comparisonTable: [
      {
        aspect: 'Primary purpose',
        toolA: 'Test a regex against text and see matches',
        toolB: 'Generate a regex from a description or intent',
      },
      {
        aspect: 'Input',
        toolA: 'Your regex pattern + sample text',
        toolB: 'Description of what you want to match (e.g. “email addresses”)',
      },
      {
        aspect: 'Best when',
        toolA: 'You already have a pattern and want to verify or debug it',
        toolB: 'You need a pattern but don’t know the exact regex syntax',
      },
    ],
    faq: [
      {
        question: 'Can I use both Regex Tester and Regex Generator together?',
        answer:
          'Yes. Generate a regex with the Regex Generator, then paste it into the Regex Tester along with sample text to verify it matches (or doesn’t match) as expected.',
      },
      {
        question: 'Is the Regex Generator an AI tool?',
        answer:
          'Yes. The Regex Generator uses AI to turn a plain-language description into a regular expression. The Regex Tester is a standard tool that runs your pattern against text.',
      },
    ],
  },
  {
    slug: 'base64-encoder-vs-base64-decoder',
    title: 'Base64 Encoder vs Base64 Decoder',
    metaDescription:
      'Compare Base64 encoder and decoder: when to encode text or binary to Base64 and when to decode back.',
    introduction:
      'Base64 encoding turns binary data or text into a safe ASCII string; decoding turns that string back into the original data. Use the encoder when you need to embed data in JSON, URLs, or APIs; use the decoder when you receive Base64 and need the original content.',
    tools: [
      { name: 'Base64 Encoder', href: '/base64-encoder' },
      { name: 'Base64 Decoder', href: '/base64-decoder' },
    ],
    comparisonTable: [
      {
        aspect: 'Primary purpose',
        toolA: 'Convert text or binary into Base64 string',
        toolB: 'Convert Base64 string back to original data or text',
      },
      {
        aspect: 'Input',
        toolA: 'Plain text or file (e.g. image)',
        toolB: 'Base64-encoded string',
      },
      {
        aspect: 'Best when',
        toolA: 'You need to send or store data as text (e.g. in JSON or HTML)',
        toolB: 'You have Base64 from an API or file and need the original content',
      },
    ],
    faq: [
      {
        question: 'When should I use Base64 encoding?',
        answer:
          'Use it when you need to represent binary data (e.g. images) or special characters as plain ASCII text—for example in data URLs, JSON payloads, or email attachments.',
      },
      {
        question: 'Is Base64 encryption?',
        answer:
          'No. Base64 is encoding, not encryption. Anyone can decode it. Do not use it to hide sensitive data; use proper encryption for that.',
      },
    ],
  },
];

export function getComparePageConfig(slug: string): ComparePageConfig | null {
  return configs.find((c) => c.slug === slug) ?? null;
}

export function getAllComparePageConfigs(): ComparePageConfig[] {
  return configs;
}
