import Link from 'next/link';
import { tools } from '@/lib/tools';
import { getRelatedTools } from '@/lib/getRelatedTools';

type Faq = { q: string; a: string };

type Props = {
  title: string;
  description: string;
  slug: string;
};

const cardClass =
  'bg-white p-6 sm:p-9 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)]';

function buildIntro(title: string, description: string) {
  // Keep this ~100–150 words, include SEO keywords.
  return `DevToolDock’s ${title} is an online tool built for fast, everyday workflows. Use it as a free developer tool when you need reliable results without setting up local scripts or switching apps. ${description} This page includes practical guidance, common use cases, and FAQs so you can move from “what is this?” to “done” quickly. Whether you’re debugging an API response, validating input, or preparing data for documentation, ${title} helps you get clean output you can copy into code, tickets, or docs.`;
}

function toolSpecific(slug: string, title: string) {
  switch (slug) {
    case 'json-formatter':
      return {
        features: [
          'Format and validate JSON with readable indentation',
          'Quickly spot syntax errors and broken structure',
          'Copy formatted output for docs, tickets, and debugging',
        ],
        useCases: [
          'Beautify a minified API response before debugging',
          'Validate JSON fixtures before committing changes',
          'Prepare a clean example payload for documentation',
        ],
        example: {
          input: '{"user":{"id":1,"name":"Ada"},"active":true}',
          output: '{\n  "user": {\n    "id": 1,\n    "name": "Ada"\n  },\n  "active": true\n}',
        },
        faqs: [
          {
            q: 'Is the JSON Formatter free to use?',
            a: 'Yes. DevToolDock provides this as a free developer tool you can use directly in your browser.',
          },
          {
            q: 'Does formatting change my JSON data?',
            a: 'Formatting only changes whitespace/indentation. The meaning of the JSON stays the same (as long as the input is valid).',
          },
          {
            q: 'What if my JSON is invalid?',
            a: 'Fix the first reported error (often a missing comma, quote, or brace) and try again. Using the JSON Validator can also help isolate syntax issues.',
          },
        ] satisfies Faq[],
      };
    case 'base64-encoder':
      return {
        features: [
          'Encode text into Base64 instantly',
          'Useful for fixtures, tokens, and transport-friendly payloads',
          'Copy output safely for use in code and APIs',
        ],
        useCases: [
          'Encode a string for test data or fixtures',
          'Create a Base64 blob for API payloads',
          'Generate content for a data URL workflow',
        ],
        example: { input: 'Hello World', output: 'SGVsbG8gV29ybGQ=' },
        faqs: [
          {
            q: 'Is Base64 encryption?',
            a: 'No. Base64 is encoding, not encryption. Anyone can decode it back to the original content.',
          },
          {
            q: 'Why does Base64 output end with "="?',
            a: 'The "=" characters are padding to make the encoded length a multiple of 4.',
          },
          {
            q: 'Is the Base64 Encoder safe for sensitive data?',
            a: 'Avoid pasting secrets into any third-party tool. Prefer working with non-sensitive data and follow your organization’s security policies.',
          },
        ] satisfies Faq[],
      };
    case 'base64-decoder':
      return {
        features: [
          'Decode Base64 to plain text',
          'Great for inspecting blobs in logs and payloads',
          'Copy decoded output for analysis and debugging',
        ],
        useCases: [
          'Decode a Base64 string to verify its content',
          'Inspect token segments and encoded payload parts',
          'Debug data URL / encoded content issues',
        ],
        example: { input: 'SGVsbG8gV29ybGQ=', output: 'Hello World' },
        faqs: [
          {
            q: 'Why does decoding fail?',
            a: 'Common causes include invalid characters, missing padding, or Base64url vs Base64 differences. Try validating the input and removing whitespace/newlines.',
          },
          {
            q: 'Can this decode files?',
            a: 'This tool focuses on text. For image blobs, use Base64 to Image to preview and verify data URLs.',
          },
          {
            q: 'Is Base64 reversible?',
            a: 'Yes. Base64 is designed to be reversible. It is not a security mechanism.',
          },
        ] satisfies Faq[],
      };
    case 'regex-tester':
      return {
        features: [
          'Test regex patterns against real text',
          'Iterate quickly with pattern + flags',
          'Spot match issues before shipping validation rules',
        ],
        useCases: [
          'Validate identifiers, emails, or slugs with anchored patterns',
          'Extract values from logs using capture groups',
          'Debug flags like g, i, and m with real samples',
        ],
        example: {
          input: 'Pattern: \\b\\w+@\\w+\\.\\w+\\b\nText: contact me at dev@example.com',
          output: 'Matches: dev@example.com',
        },
        faqs: [
          {
            q: 'Should I use ^ and $ for validation?',
            a: 'Yes. Anchors ensure your regex validates the entire string rather than matching a substring.',
          },
          {
            q: 'What causes slow regex performance?',
            a: 'Nested quantifiers and ambiguous patterns can trigger backtracking. Keep patterns specific and test worst-case inputs.',
          },
          {
            q: 'How do I understand a complex regex?',
            a: 'Use the Regex Explainer to get a plain-English breakdown, then simplify where possible.',
          },
        ] satisfies Faq[],
      };
    case 'jwt-decoder':
      return {
        features: [
          'Decode JWT header and payload for inspection',
          'Identify claims like exp, aud, iss, and sub',
          'Helpful for debugging authentication and authorization',
        ],
        useCases: [
          'Check whether a token is expired (exp claim)',
          'Verify audience/issuer values during auth debugging',
          'Inspect roles/permissions stored in the payload',
        ],
        example: {
          input: 'Paste a JWT like: header.payload.signature',
          output: 'Decoded header + payload as JSON',
        },
        faqs: [
          {
            q: 'Does decoding verify the signature?',
            a: 'No. Decoding only reads header/payload. Verification requires the signing key and server-side checks.',
          },
          {
            q: 'Is it safe to paste production tokens?',
            a: 'Avoid pasting sensitive tokens. Decode only in trusted environments and follow your security policy.',
          },
          {
            q: 'Why does a JWT look like Base64?',
            a: 'JWT header and payload are Base64url-encoded JSON.',
          },
        ] satisfies Faq[],
      };
    default:
      return {
        features: [
          `Fast ${title} results in your browser`,
          'Clear output you can copy into code or docs',
          'Designed as a practical free developer tool',
        ],
        useCases: [
          `Use ${title} to solve day-to-day developer tasks quickly`,
          'Reduce time spent on manual conversions and formatting',
          'Get consistent output for debugging and collaboration',
        ],
        example: { input: 'Input', output: 'Output' },
        faqs: [
          {
            q: `Is ${title} free to use?`,
            a: 'Yes. DevToolDock provides this as a free online tool for developers.',
          },
          {
            q: `Does ${title} run in the browser?`,
            a: 'Yes. Most DevToolDock tools are designed to run client-side for speed and convenience.',
          },
          {
            q: `What should I do if output looks wrong?`,
            a: 'Double-check the input format and try a smaller sample. If the tool supports validation, validate first, then rerun.',
          },
        ] satisfies Faq[],
      };
  }
}

export function ToolSeoContent({ title, description, slug }: Props) {
  const tool = tools.find((t) => t.slug === slug);
  const category = tool?.category;
  const related = getRelatedTools(slug, category);
  const spec = toolSpecific(slug, title);
  const intro = buildIntro(title, description);

  return (
    <>
      <section className={cardClass} aria-label="SEO content">
        <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">
          About this online tool
        </h2>
        <p className="text-gray-500 dark:text-gray-400 leading-7">{intro}</p>
        <p className="mt-4 text-gray-500 dark:text-gray-400 leading-7">
          Looking for the full directory? Browse{' '}
          <Link
            href="/tools"
            className="text-primary-500 hover:text-primary-600 underline font-medium"
          >
            Tools
          </Link>{' '}
          or{' '}
          <Link
            href="/all-tools"
            className="text-primary-500 hover:text-primary-600 underline font-medium"
          >
            All Tools
          </Link>
          .
        </p>
      </section>

      <section className={cardClass} aria-label="Use cases">
        <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">
          Use cases
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-500 dark:text-gray-400 leading-7">
          {spec.useCases.map((u) => (
            <li key={u}>{u}</li>
          ))}
        </ul>
      </section>

      <section className={cardClass} aria-label="Features">
        <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">
          Features
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-500 dark:text-gray-400 leading-7">
          {spec.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </section>

      <section className={cardClass} aria-label="Example">
        <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">
          Example
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Input
            </p>
            <pre className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-3 text-xs font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">
              {spec.example.input}
            </pre>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Output
            </p>
            <pre className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-3 text-xs font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">
              {spec.example.output}
            </pre>
          </div>
        </div>
      </section>

      <section className={cardClass} aria-label="FAQ">
        <h2 className="mb-6 text-xl font-bold text-gray-800 dark:text-white/90">
          FAQ
        </h2>
        <div className="space-y-5">
          {spec.faqs.slice(0, 3).map((item) => (
            <div key={item.q}>
              <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                {item.q}
              </h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400 leading-7">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Internal linking (in addition to existing Related Tools card) */}
      {related.length > 0 ? (
        <section className={cardClass} aria-label="More tools">
          <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">
            More tools you might need
          </h2>
          <p className="text-gray-500 dark:text-gray-400 leading-7">
            If you’re using {title}, these related tools can help with adjacent
            tasks like validation, conversion, and debugging.
          </p>
          <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-500 dark:text-gray-400 leading-7">
            {related.slice(0, 6).map((t) => (
              <li key={t.slug}>
                <Link
                  href={t.href}
                  className="text-primary-500 hover:text-primary-600 underline font-medium"
                >
                  {t.name}
                </Link>
                {t.description ? ` — ${t.description}` : ''}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}

