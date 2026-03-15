export type BlogPost = {
  title: string;
  slug: string;
  description: string;
  date: string;
  author: string;
  /** HTML content; may include internal links to tools e.g. href="/json-formatter" */
  content: string;
  /** Optional tool slug to embed below the article (e.g. "json-formatter"). Uses existing ToolLayout. */
  embedTool?: string;
};

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
      <h2>Why format JSON?</h2>
      <p>JSON is the standard for APIs and config files. Minified JSON is hard to read and debug. Formatting adds indentation and line breaks so you can spot errors and understand structure quickly.</p>
      <h2>Steps to format JSON online</h2>
      <ul>
        <li>Paste your raw or minified JSON into the input area</li>
        <li>Click format to apply consistent indentation</li>
        <li>Use validate to catch syntax errors before they cause issues</li>
      </ul>
      <p>Use our <a href="/json-formatter" class="text-primary-500 hover:text-primary-600 underline font-medium">JSON Formatter</a> to format and validate JSON in the browser. For related workflows, try the <a href="/json-validator" class="text-primary-500 hover:text-primary-600 underline font-medium">JSON Validator</a> and <a href="/json-minifier" class="text-primary-500 hover:text-primary-600 underline font-medium">JSON Minifier</a>.</p>
    `,
  },
  {
    title: 'Regex Explained for Developers',
    slug: 'regex-explained-for-developers',
    description: 'A practical guide to regular expressions for developers. Learn patterns, flags, and how to test regex online.',
    date: '2026-01-15',
    author: 'DevToolDock Team',
    content: `
      <h2>What are regular expressions?</h2>
      <p>Regular expressions (regex) are patterns that match text. They are used for validation, search-and-replace, and parsing in almost every language and editor.</p>
      <h2>Common regex concepts</h2>
      <ul>
        <li><strong>Anchors:</strong> <code>^</code> and <code>$</code> match the start and end of a string</li>
        <li><strong>Character classes:</strong> <code>\\d</code> for digits, <code>\\w</code> for word characters</li>
        <li><strong>Quantifiers:</strong> <code>+</code>, <code>*</code>, <code>?</code> for one-or-more, zero-or-more, optional</li>
        <li><strong>Flags:</strong> <code>g</code> (global), <code>i</code> (case-insensitive), <code>m</code> (multiline)</li>
      </ul>
      <p>Test your patterns live with our <a href="/regex-tester" class="text-primary-500 hover:text-primary-600 underline font-medium">Regex Tester</a>. For learning and explaining regex, use the <a href="/regex-explainer" class="text-primary-500 hover:text-primary-600 underline font-medium">Regex Explainer</a>.</p>
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
      <h2>What is Base64?</h2>
      <p>Base64 is a way to represent binary data as ASCII text. It uses 64 characters (A–Z, a–z, 0–9, plus two symbols) so data can be safely sent in JSON, XML, or URLs.</p>
      <h2>When to use Base64</h2>
      <ul>
        <li>Embedding images in HTML or CSS (data URLs)</li>
        <li>Storing binary data in JSON or APIs</li>
        <li>Including attachments in email or API payloads</li>
      </ul>
      <p>Encode or decode in the browser with our <a href="/base64-encoder" class="text-primary-500 hover:text-primary-600 underline font-medium">Base64 Encoder</a> and <a href="/base64-decoder" class="text-primary-500 hover:text-primary-600 underline font-medium">Base64 Decoder</a>. All processing is client-side—no data is sent to a server.</p>
    `,
  },
  {
    title: 'Best Developer Tools 2026',
    slug: 'best-developer-tools-2026',
    description: 'A roundup of the best free developer tools for 2026: JSON, encoding, regex, and productivity utilities.',
    date: '2026-02-01',
    author: 'DevToolDock Team',
    content: `
      <h2>Must-have categories</h2>
      <p>Developers rely on a small set of tool categories every day: data formatting, encoding, validation, and conversion.</p>
      <h2>Top tools to bookmark</h2>
      <ul>
        <li><a href="/json-formatter" class="text-primary-500 hover:text-primary-600 underline font-medium">JSON Formatter</a> – format, validate, and minify JSON</li>
        <li><a href="/regex-tester" class="text-primary-500 hover:text-primary-600 underline font-medium">Regex Tester</a> – test and debug regular expressions</li>
        <li><a href="/base64-encoder" class="text-primary-500 hover:text-primary-600 underline font-medium">Base64 Encoder</a> / <a href="/base64-decoder" class="text-primary-500 hover:text-primary-600 underline font-medium">Base64 Decoder</a> – encode and decode Base64</li>
        <li><a href="/jwt-decoder" class="text-primary-500 hover:text-primary-600 underline font-medium">JWT Decoder</a> – inspect JWT headers and payloads</li>
      </ul>
      <p>Browse all tools on our <a href="/tools" class="text-primary-500 hover:text-primary-600 underline font-medium">Tools</a> page and by <a href="/categories" class="text-primary-500 hover:text-primary-600 underline font-medium">Categories</a>.</p>
    `,
  },
  {
    title: 'How to Decode JWT Tokens',
    slug: 'how-to-decode-jwt-tokens',
    description: 'Learn how to decode and inspect JWT (JSON Web Token) headers and payloads using a free online JWT decoder.',
    date: '2026-02-05',
    author: 'DevToolDock Team',
    content: `
      <h2>What is a JWT?</h2>
      <p>A JWT is a signed token with three Base64url parts: header, payload, and signature. It is used for authentication and passing claims between services.</p>
      <h2>Why decode JWTs?</h2>
      <p>Decoding lets you inspect the header (algorithm, type) and payload (claims like user id, expiry) without verifying the signature. Useful for debugging and understanding token contents.</p>
      <h2>Decode safely online</h2>
      <p>Use our <a href="/jwt-decoder" class="text-primary-500 hover:text-primary-600 underline font-medium">JWT Decoder</a> to paste a token and see the decoded header and payload. Never paste production secrets—decode only in trusted environments. For generating test tokens, try the <a href="/jwt-generator" class="text-primary-500 hover:text-primary-600 underline font-medium">JWT Generator</a>.</p>
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
      <h2>What a JSON formatter does</h2>
      <p>A <a href="/json-formatter" class="text-primary-500 hover:text-primary-600 underline font-medium">JSON Formatter</a> beautifies or minifies JSON: it adds or removes whitespace and indentation. It often also validates so you get both readability and error checking in one step.</p>
      <h2>What a JSON validator does</h2>
      <p>A <a href="/json-validator" class="text-primary-500 hover:text-primary-600 underline font-medium">JSON Validator</a> checks syntax only. It tells you if the JSON is valid and where errors are (e.g. missing comma, trailing comma). It does not change the structure or formatting.</p>
      <h2>Which one to use?</h2>
      <ul>
        <li>Use the formatter when you have minified or messy JSON and want it readable (and optionally valid).</li>
        <li>Use the validator when you only need to know if JSON is valid and where it breaks.</li>
      </ul>
      <p>Many developers use the formatter first; if it reports errors, fix them then format again. Both tools are free and run in your browser.</p>
    `,
  },
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogs.find((b) => b.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogs.map((b) => b.slug);
}
