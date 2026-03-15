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
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogs.find((b) => b.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogs.map((b) => b.slug);
}
