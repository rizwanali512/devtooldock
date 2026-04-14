export type BlogPost = {
  title: string;
  slug: string;
  description: string;
  date: string;
  author: string;
  imageSrc?: string;
  imageAlt?: string;
  faqs?: { question: string; answer: string }[];
  /** HTML content; may include internal links to tools e.g. href="/json-formatter" */
  content: string;
  /** Optional tool slug to embed below the article (e.g. "json-formatter"). Uses existing ToolLayout. */
  embedTool?: string;
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function markdownToHtml(markdown: string): string {
  // For this blog system we want PDF-like spacing:
  // treat each non-empty line as its own paragraph, and support "## " headings.
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks: string[] = [];

  for (const raw of lines) {
    const line = raw;
    if (!line.trim()) continue;

    if (line.startsWith('## ')) {
      blocks.push(`<h2>${escapeHtml(line.slice(3).trim())}</h2>`);
      continue;
    }

    blocks.push(`<p>${escapeHtml(line)}</p>`);
  }

  return blocks.join('\n');
}

function extractFaqsFromMarkdownBody(markdownBody: string): {
  bodyWithoutFaqs: string;
  faqs: { question: string; answer: string }[] | undefined;
} {
  const lines = markdownBody.replace(/\r\n/g, '\n').split('\n');
  const faqStart = lines.findIndex((l) => l.trim() === '## FAQs');
  if (faqStart === -1) {
    return { bodyWithoutFaqs: markdownBody, faqs: undefined };
  }

  const before = lines.slice(0, faqStart).join('\n').trim();
  const after = lines.slice(faqStart + 1);

  const items: { question: string; answer: string }[] = [];
  let i = 0;
  while (i < after.length) {
    while (i < after.length && !after[i]?.trim()) i++;
    const q = after[i]?.trim();
    if (!q) break;
    i++;
    while (i < after.length && !after[i]?.trim()) i++;
    const a = after[i]?.trim();
    if (!a) break;
    i++;
    items.push({ question: q, answer: a });
  }

  return {
    bodyWithoutFaqs: before,
    faqs: items.length ? items : undefined,
  };
}

function readMarkdownBlog(slug: string): Omit<BlogPost, 'date' | 'author'> | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require('node:fs') as typeof import('node:fs');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require('node:path') as typeof import('node:path');
    const file = path.join(process.cwd(), 'content', 'blog', `${slug}.md`);
    const raw = fs.readFileSync(file, 'utf8');

    const lines = raw.replace(/\r\n/g, '\n').split('\n');
    if (lines[0] !== '---') return null;
    const endIdx = lines.indexOf('---', 1);
    if (endIdx === -1) return null;

    const frontmatterLines = lines.slice(1, endIdx);
    const body = lines.slice(endIdx + 1).join('\n');

    const fm: Record<string, string> = {};
    for (const l of frontmatterLines) {
      const idx = l.indexOf(':');
      if (idx === -1) continue;
      const key = l.slice(0, idx).trim();
      const val = l.slice(idx + 1).trim();
      // Strip optional surrounding quotes
      fm[key] = val.replace(/^"(.*)"$/, '$1');
    }

    const title = fm.title ?? '';
    const description = fm.description ?? '';
    const parsedSlug = fm.slug ?? slug;
    const imageAlt = fm.imageAlt;

    if (!title || !description || !parsedSlug) return null;

    const extracted = extractFaqsFromMarkdownBody(body.trim());

    return {
      title,
      description,
      slug: parsedSlug,
      imageAlt,
      imageSrc:
        parsedSlug === 'ai-for-coding-2026'
          ? '/images/blogs/Best%20AI%20for%20Coding%20Tools.png'
          : undefined,
      faqs: extracted.faqs,
      content: markdownToHtml(extracted.bodyWithoutFaqs),
    };
  } catch {
    return null;
  }
}

export const blogs: BlogPost[] = [
  {
    title: 'How to Format JSON Online',
    slug: 'how-to-format-json',
    description:
      'Learn how to format JSON data using online tools. Validate, beautify, and minify JSON in seconds.',
    date: '2024-01-15',
    author: 'DevToolDock Team',
    embedTool: 'json-formatter',
    content: `
      <p>JSON is everywhere in modern development—APIs, configs, and data exchange. Keeping it readable and valid saves time and prevents bugs.</p>
      <p>Formatting JSON means applying consistent indentation and line breaks so humans can read it. Minifying does the opposite: removes whitespace to shrink payload size.</p>
      <p>Use our <a href="/json-formatter" class="text-primary-500 hover:text-primary-600 underline font-medium">JSON Formatter</a> here to paste raw JSON and get formatted or minified output with syntax highlighting. You can also validate and fix common syntax errors in one click.</p>
      <p>For converting between formats, try our <a href="/json-to-csv" class="text-primary-500 hover:text-primary-600 underline font-medium">JSON to CSV</a> and <a href="/json-to-yaml" class="text-primary-500 hover:text-primary-600 underline font-medium">JSON to YAML</a> tools to integrate with spreadsheets or config files.</p>
    `,
  },
  {
    title: 'Encode and Decode Base64 in the Browser',
    slug: 'encode-decode-base64',
    description:
      'A quick guide to encoding and decoding Base64 strings with free online tools—no server required.',
    date: '2024-02-01',
    author: 'DevToolDock Team',
    embedTool: 'base64-encoder',
    content: `
      <p>Base64 encoding turns binary data into ASCII text, which is useful for embedding images in HTML, sending attachments in APIs, or storing binary in JSON.</p>
      <p>Encoding is straightforward: you input text or upload a file and get a Base64 string. Decoding reverses the process so you can recover the original content or download the file.</p>
      <p>Use our <a href="/base64-encoder" class="text-primary-500 hover:text-primary-600 underline font-medium">Base64 Encoder</a> and <a href="/base64-decoder" class="text-primary-500 hover:text-primary-600 underline font-medium">Base64 Decoder</a> to convert in both directions instantly. All processing happens in your browser—nothing is sent to a server.</p>
    `,
  },
  {
    title: 'URL Encoding and Parsing for Developers',
    slug: 'url-encoding-parsing',
    description:
      'Understand URL encoding (percent-encoding) and how to parse query strings and URLs with online utilities.',
    date: '2024-02-15',
    author: 'DevToolDock Team',
    embedTool: 'url-encoder',
    content: `
      <p>URLs can only contain a limited set of characters. Special characters and spaces must be percent-encoded so they are transmitted safely.</p>
      <p>Encoding converts characters like spaces and ampersands into their %XX form. Decoding converts them back so you can read or process the values.</p>
      <p>Our <a href="/url-encoder" class="text-primary-500 hover:text-primary-600 underline font-medium">URL Encoder</a> and <a href="/url-decoder" class="text-primary-500 hover:text-primary-600 underline font-medium">URL Decoder</a> handle encoding and decoding. For breaking down full URLs into path, query, and fragment, use the <a href="/url-parser" class="text-primary-500 hover:text-primary-600 underline font-medium">URL Parser</a> and <a href="/query-string-parser" class="text-primary-500 hover:text-primary-600 underline font-medium">Query String Parser</a>.</p>
    `,
  },
  {
    title: 'How to Format JSON Online',
    slug: 'how-to-format-json-online',
    description: 'Learn how to format JSON easily using an online JSON formatter. Validate, beautify, and fix JSON in seconds.',
    date: '2026-01-10',
    author: 'DevToolDock Team',
    embedTool: 'json-formatter',
    content: `
      <p>Formatting JSON is one of those small habits that saves hours over the course of a week. Whether you’re debugging an API response, reviewing logs, or editing a config file, readable JSON makes problems obvious—and prevents simple mistakes from turning into production incidents.</p>

      <h2>Why format JSON?</h2>
      <p>JSON is the default payload format for modern APIs, webhooks, configuration files, and many developer tools. But JSON is often delivered in a minified form (no line breaks, no indentation). Minified JSON is great for performance, but it’s painful for humans. Formatting (also called “beautifying”) adds consistent indentation, line breaks, and spacing so you can:</p>
      <ul>
        <li>Quickly understand nested objects and arrays</li>
        <li>Spot missing fields, unexpected values, and type mismatches</li>
        <li>Locate syntax errors (missing commas, quotes, braces)</li>
        <li>Copy a single branch of data while keeping structure intact</li>
      </ul>

      <h2>How to format JSON online (step-by-step)</h2>
      <p>To format JSON online, you don’t need any setup. You can do it right inside your browser:</p>
      <ul>
        <li><strong>Paste your JSON</strong>: Copy raw or minified JSON into the editor.</li>
        <li><strong>Format</strong>: Apply indentation so objects and arrays are readable.</li>
        <li><strong>Validate</strong>: Check for syntax errors before you ship or share.</li>
        <li><strong>Copy the output</strong>: Use the formatted JSON in your code, logs, or documentation.</li>
      </ul>
      <p>Try it now with our <a href="/json-formatter" class="text-primary-500 hover:text-primary-600 underline font-medium">JSON Formatter</a>. If you only need error checking (without changing formatting), use the <a href="/json-validator" class="text-primary-500 hover:text-primary-600 underline font-medium">JSON Validator</a>.</p>

      <h2>Common JSON errors (and how to fix them)</h2>
      <p>If your formatter says the JSON is invalid, don’t panic—most issues are simple:</p>
      <ul>
        <li><strong>Trailing commas</strong>: JSON does not allow a comma after the last item in an object or array.</li>
        <li><strong>Single quotes</strong>: JSON requires double quotes for strings and object keys.</li>
        <li><strong>Unescaped characters</strong>: Quotes inside strings must be escaped like <code>\\"</code>.</li>
        <li><strong>Mismatched braces</strong>: One extra <code>}</code> or missing <code>]</code> breaks parsing.</li>
      </ul>
      <p>A good workflow is: validate → fix the first reported error → validate again. Once it’s valid, format it for readability.</p>

      <h2>Format vs minify: when to use each</h2>
      <p>Formatting is for humans; minifying is for machines. If you’re sending JSON over the network or storing it in a size-sensitive place, minifying can reduce payload size by removing whitespace. For that, use our <a href="/json-minifier" class="text-primary-500 hover:text-primary-600 underline font-medium">JSON Minifier</a>. If you’re reading or debugging JSON, always format first.</p>

      <h2>Use cases developers run into daily</h2>
      <ul>
        <li><strong>Debugging API responses</strong>: paste JSON and scan for missing/incorrect fields.</li>
        <li><strong>Comparing two payloads</strong>: format both then diff them (see <a href="/json-diff-viewer" class="text-primary-500 hover:text-primary-600 underline font-medium">JSON Diff Viewer</a>).</li>
        <li><strong>Cleaning config files</strong>: make large JSON configs readable before committing.</li>
        <li><strong>Preparing examples</strong>: formatted JSON looks professional in docs and tickets.</li>
      </ul>

      <h2>Related DevToolDock tools</h2>
      <p>Once your JSON is clean, you might also want to convert it into another format. DevToolDock includes fast browser-based converters like <a href="/json-to-yaml" class="text-primary-500 hover:text-primary-600 underline font-medium">JSON to YAML</a> and <a href="/json-to-csv" class="text-primary-500 hover:text-primary-600 underline font-medium">JSON to CSV</a>.</p>
    `,
  },
  {
    title: 'Regex Explained for Developers',
    slug: 'regex-explained-for-developers',
    description: 'A practical guide to regular expressions for developers. Learn patterns, flags, and how to test regex online.',
    date: '2026-01-15',
    author: 'DevToolDock Team',
    content: `
      <p>Regular expressions (regex) are one of the highest leverage skills a developer can learn. A good pattern can replace dozens of lines of parsing logic—but a bad pattern can be slow, confusing, or silently wrong. This guide explains regex in plain language and shows how to test patterns safely.</p>

      <h2>What are regular expressions?</h2>
      <p>A regular expression is a pattern that matches text. You’ll see regex used in validators (email/username rules), search-and-replace, log filtering, routing rules, and data extraction. Most languages implement a very similar core syntax, with a few differences in advanced features.</p>

      <h2>Start with the mental model</h2>
      <p>Think of a regex as a “recipe” for what a valid string looks like. The engine reads your pattern left-to-right and tries to find a match. Some patterns match anywhere in the text; others are anchored to the start and end.</p>

      <h2>Core building blocks</h2>
      <ul>
        <li><strong>Anchors</strong>: <code>^</code> (start) and <code>$</code> (end). Use them for full-string validation.</li>
        <li><strong>Character classes</strong>: <code>[a-z]</code>, <code>[0-9]</code>, or shortcuts like <code>\\d</code> (digit), <code>\\w</code> (word char), <code>\\s</code> (whitespace).</li>
        <li><strong>Quantifiers</strong>: <code>*</code> (0+), <code>+</code> (1+), <code>?</code> (0/1), <code>{n}</code>, <code>{n,}</code>, <code>{n,m}</code>.</li>
        <li><strong>Groups</strong>: parentheses <code>(...)</code> group parts of a pattern. Some engines support named groups like <code>(?&lt;name&gt;...)</code>.</li>
        <li><strong>Alternation</strong>: <code>a|b</code> means “match a OR b”.</li>
      </ul>

      <h2>Regex flags you’ll use constantly</h2>
      <p>Flags change how the pattern behaves:</p>
      <ul>
        <li><code>g</code>: global (find all matches, not just the first)</li>
        <li><code>i</code>: case-insensitive</li>
        <li><code>m</code>: multiline (<code>^</code> and <code>$</code> work per line)</li>
        <li><code>s</code>: dotAll (<code>.</code> matches newlines too)</li>
      </ul>

      <h2>Practical examples</h2>
      <p>Here are a few useful patterns to practice with:</p>
      <ul>
        <li><strong>Simple identifier</strong>: <code>^[a-zA-Z_][a-zA-Z0-9_]*$</code></li>
        <li><strong>Hex color</strong>: <code>^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$</code></li>
        <li><strong>Find UUID</strong>: <code>[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}</code></li>
      </ul>

      <h2>How to test regex safely</h2>
      <p>Regex debugging is easiest when you can see matches and groups immediately. Use our <a href="/regex-tester" class="text-primary-500 hover:text-primary-600 underline font-medium">Regex Tester</a> to experiment with patterns and flags in real time. If you want a human-readable breakdown of what a pattern does, use the <a href="/regex-explainer" class="text-primary-500 hover:text-primary-600 underline font-medium">Regex Explainer</a>.</p>

      <h2>Common mistakes (and how to avoid them)</h2>
      <ul>
        <li><strong>Missing anchors</strong>: without <code>^</code> and <code>$</code>, validators may accept partial matches.</li>
        <li><strong>Overusing <code>.*</code></strong>: it’s greedy and can cause “match too much” bugs; prefer specific character classes.</li>
        <li><strong>Catastrophic backtracking</strong>: nested quantifiers like <code>(a+)+</code> can be very slow on certain inputs.</li>
        <li><strong>Escaping confusion</strong>: when writing regex in strings, you often need double escaping (e.g. <code>\\\\d</code> in JS source to mean <code>\\d</code>).</li>
      </ul>

      <h2>Where regex fits in a modern toolbelt</h2>
      <p>Regex is great for validation and extraction, but don’t use it as a full HTML parser or when a structured parser exists. When in doubt, write the simplest pattern that works and document it with examples.</p>
    `,
  },
  {
    title: 'What Is Base64 Encoding?',
    slug: 'what-is-base64-encoding',
    description: 'Understand Base64 encoding: what it is, when to use it, and how to encode or decode with free online tools.',
    date: '2026-01-20',
    author: 'DevToolDock Team',
    embedTool: 'base64-encoder',
    content: `
      <p>Base64 shows up everywhere: JWTs, data URLs, API payloads, email attachments, and tooling output. Developers often copy/paste Base64 strings without thinking about what they represent. This article explains Base64 clearly and shows when it’s appropriate to use.</p>

      <h2>What is Base64?</h2>
      <p>Base64 is an encoding that represents binary data as ASCII characters. It uses 64 symbols (A–Z, a–z, 0–9, plus two additional symbols like <code>+</code> and <code>/</code>) to encode bytes into text. That makes Base64 useful whenever you need to move binary data through systems that expect text: JSON, XML, URLs, or form fields.</p>

      <h2>Encoding vs encryption (important!)</h2>
      <p>Base64 is not encryption. Anyone can decode Base64 back into the original bytes. If you need secrecy, you need encryption (or signing) in addition to encoding. Base64 is simply a transport-friendly representation.</p>

      <h2>When should you use Base64?</h2>
      <ul>
        <li><strong>Data URLs</strong>: embed small images/icons directly in HTML/CSS.</li>
        <li><strong>API payloads</strong>: send binary blobs (like small files) inside JSON when multipart upload isn’t available.</li>
        <li><strong>Email and MIME</strong>: attachments and inline content are commonly Base64-encoded.</li>
        <li><strong>Tokens</strong>: JWTs use Base64url for header and payload segments (a URL-safe variant).</li>
      </ul>

      <h2>When you should avoid Base64</h2>
      <p>Base64 increases size by roughly 33% compared to the original bytes. For large files, it’s usually better to upload the file directly (multipart) and store a URL or reference in your JSON instead of the Base64 itself.</p>

      <h2>How to encode Base64 in the browser</h2>
      <p>To encode plain text, you convert the text to bytes and then encode those bytes into a Base64 string. For files, you read the file and encode its bytes. DevToolDock does this client-side so your input isn’t sent to a server.</p>
      <p>Use our <a href="/base64-encoder" class="text-primary-500 hover:text-primary-600 underline font-medium">Base64 Encoder</a> to encode text instantly. If you’re trying to see what a Base64 blob contains, use the <a href="/base64-decoder" class="text-primary-500 hover:text-primary-600 underline font-medium">Base64 Decoder</a> to reverse it.</p>

      <h2>Common Base64 pitfalls</h2>
      <ul>
        <li><strong>Newlines</strong>: some encoders insert line breaks; many decoders can handle them but some can’t.</li>
        <li><strong>Padding</strong>: Base64 often ends with <code>=</code> or <code>==</code>. Removing padding can break strict decoders.</li>
        <li><strong>Base64 vs Base64url</strong>: JWT uses Base64url which swaps characters and removes padding for URL safety.</li>
      </ul>

      <h2>Related tools</h2>
      <p>If you’re dealing with tokens, Base64 often appears inside JWTs. After decoding Base64, you may want to inspect a token with our <a href="/jwt-decoder" class="text-primary-500 hover:text-primary-600 underline font-medium">JWT Decoder</a>. For converting images, try <a href="/image-to-base64" class="text-primary-500 hover:text-primary-600 underline font-medium">Image to Base64</a> and <a href="/base64-to-image" class="text-primary-500 hover:text-primary-600 underline font-medium">Base64 to Image</a>.</p>
    `,
  },
  {
    title: 'Best Developer Tools 2026',
    slug: 'best-developer-tools-2026',
    description: 'A roundup of the best free developer tools for 2026: JSON, encoding, regex, and productivity utilities.',
    date: '2026-02-01',
    author: 'DevToolDock Team',
    content: `
      <p>The “best developer tools” aren’t always the fanciest. They’re the ones you reach for multiple times per day: formatters, encoders/decoders, validators, converters, and tiny utilities that turn minutes of friction into seconds of flow. In 2026, a modern developer toolkit is a mix of browser-based utilities, IDE features, and a few trusted command-line tools.</p>

      <h2>What makes a tool worth bookmarking?</h2>
      <ul>
        <li><strong>Fast</strong>: loads quickly and responds instantly.</li>
        <li><strong>Safe</strong>: ideally runs in the browser for sensitive data.</li>
        <li><strong>Accurate</strong>: output is deterministic and standards-compliant.</li>
        <li><strong>Practical</strong>: solves real daily problems (not just demos).</li>
      </ul>

      <h2>Must-have categories in 2026</h2>
      <p>Most developer workflows revolve around a few categories:</p>
      <ul>
        <li><strong>Data formatting</strong>: JSON, YAML, CSV, XML</li>
        <li><strong>Encoding/decoding</strong>: Base64, URL encoding</li>
        <li><strong>Validation</strong>: JSON validity, UUID format, JWT structure</li>
        <li><strong>Text utilities</strong>: diffing, casing, slugging, counting</li>
        <li><strong>Web utilities</strong>: meta tags, robots.txt, HTTP headers</li>
      </ul>

      <h2>Top DevToolDock tools to bookmark</h2>
      <ul>
        <li><a href="/json-formatter" class="text-primary-500 hover:text-primary-600 underline font-medium">JSON Formatter</a> – format, validate, and minify JSON for debugging and documentation.</li>
        <li><a href="/json-validator" class="text-primary-500 hover:text-primary-600 underline font-medium">JSON Validator</a> – find syntax errors quickly with clear feedback.</li>
        <li><a href="/regex-tester" class="text-primary-500 hover:text-primary-600 underline font-medium">Regex Tester</a> – test patterns and flags against real text safely.</li>
        <li><a href="/base64-encoder" class="text-primary-500 hover:text-primary-600 underline font-medium">Base64 Encoder</a> and <a href="/base64-decoder" class="text-primary-500 hover:text-primary-600 underline font-medium">Base64 Decoder</a> – convert strings both directions without sending data to a server.</li>
        <li><a href="/jwt-decoder" class="text-primary-500 hover:text-primary-600 underline font-medium">JWT Decoder</a> – inspect header and payload claims when debugging auth.</li>
        <li><a href="/url-encoder" class="text-primary-500 hover:text-primary-600 underline font-medium">URL Encoder</a> / <a href="/url-decoder" class="text-primary-500 hover:text-primary-600 underline font-medium">URL Decoder</a> – debug query strings and encode unsafe characters.</li>
      </ul>

      <h2>Use cases these tools cover</h2>
      <p>Here’s what these tools save you from doing manually:</p>
      <ul>
        <li>Reading minified API responses (format JSON first)</li>
        <li>Fixing an auth issue (decode JWT payload and check expiry)</li>
        <li>Building a clean URL (encode query parameters properly)</li>
        <li>Writing validation rules (test regex with real examples)</li>
      </ul>

      <h2>Explore by category</h2>
      <p>If you’re building your personal toolbox, start with the essentials and add utilities as you need them. Browse all tools on the <a href="/tools" class="text-primary-500 hover:text-primary-600 underline font-medium">Tools</a> page or discover them by <a href="/categories" class="text-primary-500 hover:text-primary-600 underline font-medium">Categories</a>. DevToolDock is designed to keep common tasks in one place with consistent UX.</p>
    `,
  },
  {
    title: 'How to Decode JWT Tokens',
    slug: 'how-to-decode-jwt-tokens',
    description: 'Learn how to decode and inspect JWT (JSON Web Token) headers and payloads using a free online JWT decoder.',
    date: '2026-02-05',
    author: 'DevToolDock Team',
    content: `
      <p>JWTs (JSON Web Tokens) are everywhere in modern authentication. When a login flow breaks, the fastest way to understand what’s happening is to decode the token and inspect the claims. This guide shows how to decode JWTs, what each part means, and what to look for when debugging.</p>

      <h2>What is a JWT?</h2>
      <p>A JWT is a compact token that contains JSON data. A standard JWT has three dot-separated segments:</p>
      <ul>
        <li><strong>Header</strong> (Base64url): identifies the signing algorithm and token type</li>
        <li><strong>Payload</strong> (Base64url): the “claims” (user id, roles, expiry, issuer)</li>
        <li><strong>Signature</strong>: proves integrity (was signed by the expected secret/private key)</li>
      </ul>
      <p>JWTs are often used as bearer tokens in the <code>Authorization</code> header. They can be signed (JWS) and sometimes encrypted (JWE), though encryption is less common in typical web apps.</p>

      <h2>Decoding vs verifying (don’t confuse them)</h2>
      <p>Decoding means reading the header and payload. It does not prove the token is valid. Verification checks the signature using the correct key and ensures claims like <code>exp</code>, <code>aud</code>, and <code>iss</code> are acceptable. When you decode a token in a tool, you’re typically just inspecting it for debugging.</p>

      <h2>Why decode JWTs?</h2>
      <p>Decoding is useful when:</p>
      <ul>
        <li>A user is unexpectedly logged out (check <code>exp</code> / expiry)</li>
        <li>An API rejects a request (check <code>aud</code> / audience and <code>iss</code> / issuer)</li>
        <li>Permissions look wrong (check roles/claims in the payload)</li>
        <li>You suspect you’re using the wrong token (check <code>sub</code> or user id)</li>
      </ul>

      <h2>How to decode a JWT token online</h2>
      <p>Use our <a href="/jwt-decoder" class="text-primary-500 hover:text-primary-600 underline font-medium">JWT Decoder</a> to paste a token and instantly view the decoded header and payload. The decoder helps you see JSON claims clearly without manual Base64url conversions.</p>

      <h2>Security tips</h2>
      <ul>
        <li><strong>Don’t paste production tokens into untrusted tools</strong>. DevToolDock tools are designed to run client-side, but always follow your organization’s security policy.</li>
        <li><strong>Never paste secrets</strong> (JWT signing keys). A decoder doesn’t need your secret.</li>
        <li><strong>Remember signatures matter</strong>. A decoded payload can be edited; verification is what makes claims trustworthy.</li>
      </ul>

      <h2>Related DevToolDock tools</h2>
      <p>JWT segments are Base64url. If you’re doing deeper debugging, you may also need Base64 tools: <a href="/base64-encoder" class="text-primary-500 hover:text-primary-600 underline font-medium">Base64 Encoder</a> and <a href="/base64-decoder" class="text-primary-500 hover:text-primary-600 underline font-medium">Base64 Decoder</a>. To generate test tokens for local development, use the <a href="/jwt-generator" class="text-primary-500 hover:text-primary-600 underline font-medium">JWT Generator</a>.</p>
    `,
  },
  {
    title: 'JSON Formatter vs JSON Validator',
    slug: 'json-formatter-vs-json-validator',
    description: 'When to use a JSON formatter versus a JSON validator, and how both tools help you work with JSON data.',
    date: '2026-02-10',
    author: 'DevToolDock Team',
    embedTool: 'json-formatter',
    content: `
      <p>“Formatter” and “validator” sound similar, but they solve different problems. If you work with APIs, logs, or configs, you’ll use both—often in the same workflow. Here’s how they differ and when to choose each.</p>

      <h2>What a JSON formatter does</h2>
      <p>A <a href="/json-formatter" class="text-primary-500 hover:text-primary-600 underline font-medium">JSON Formatter</a> changes how JSON looks without changing what it means. It can:</p>
      <ul>
        <li><strong>Beautify</strong>: add indentation and line breaks so the structure is readable.</li>
        <li><strong>Minify</strong>: remove whitespace so the payload is smaller (useful for transport).</li>
      </ul>
      <p>Most formatters also validate as part of formatting—because you can’t reliably format invalid JSON. This makes a formatter the fastest “first step” when you paste JSON from logs or an API response.</p>

      <h2>What a JSON validator does</h2>
      <p>A <a href="/json-validator" class="text-primary-500 hover:text-primary-600 underline font-medium">JSON Validator</a> checks whether a string is valid JSON. It focuses on correctness, not appearance. A validator typically helps you answer:</p>
      <ul>
        <li>Is the JSON syntactically valid?</li>
        <li>Where is the first error (line/column), if invalid?</li>
        <li>What kind of error is it (missing comma, unclosed string, etc.)?</li>
      </ul>
      <p>Validators are useful when you want a pure “pass/fail + location” result and don’t want formatting to be part of the workflow.</p>

      <h2>Common scenarios and which tool to use</h2>
      <ul>
        <li><strong>Minified API response</strong>: start with the formatter to make it readable.</li>
        <li><strong>Unit test fixtures</strong>: validate JSON before committing to catch typos early.</li>
        <li><strong>Performance-sensitive payload</strong>: minify valid JSON using a formatter or a dedicated <a href="/json-minifier" class="text-primary-500 hover:text-primary-600 underline font-medium">JSON Minifier</a>.</li>
        <li><strong>Comparing two payloads</strong>: format both, then diff them with <a href="/json-diff-viewer" class="text-primary-500 hover:text-primary-600 underline font-medium">JSON Diff Viewer</a>.</li>
      </ul>

      <h2>A simple workflow that works</h2>
      <p>For most developers, this flow is reliable:</p>
      <ul>
        <li>Paste JSON into the <a href="/json-formatter" class="text-primary-500 hover:text-primary-600 underline font-medium">JSON Formatter</a></li>
        <li>If invalid, fix the first error and try again</li>
        <li>Once valid and readable, copy the formatted output</li>
      </ul>
      <p>If you only need a validity check for automation or quick verification, use the <a href="/json-validator" class="text-primary-500 hover:text-primary-600 underline font-medium">JSON Validator</a>.</p>

      <h2>Related DevToolDock tools</h2>
      <p>After formatting/validating, you might want to transform the data: <a href="/json-to-yaml" class="text-primary-500 hover:text-primary-600 underline font-medium">JSON to YAML</a>, <a href="/json-to-csv" class="text-primary-500 hover:text-primary-600 underline font-medium">JSON to CSV</a>, or quickly preview differences with <a href="/json-diff-viewer" class="text-primary-500 hover:text-primary-600 underline font-medium">JSON Diff Viewer</a>.</p>
    `,
  },
  ...(readMarkdownBlog('ai-for-coding-2026')
    ? [
        {
          ...readMarkdownBlog('ai-for-coding-2026')!,
          date: '2026-04-14',
          author: 'DevToolDock Team',
        },
      ]
    : []),
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogs.find((b) => b.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogs.map((b) => b.slug);
}
