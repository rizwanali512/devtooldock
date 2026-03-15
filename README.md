# DevToolDock

**DevToolDock** – Free developer tools and AI utilities. Built with **Next.js** and **Tailwind CSS**.

DevToolDock provides free, fast tools for developers: JSON formatter, Base64 encoder/decoder, regex tester, UUID generator, file converters, and more. All tools run in your browser.

## Key Features

- **Next.js & Tailwind CSS:** Modern tech stack for fast, responsive development with Tailwind v4 and Next.js App Router.
- **Developer Tools:** Format JSON, encode/decode Base64, test regex, generate UUIDs, convert files, and more.
- **AI Tools:** AI-powered generators for code, SQL, text, and other developer utilities.
- **SEO & Metadata:** Sitemap, robots.txt, OpenGraph, and per-page metadata configured for production.

## Getting Started

We use npm as the package manager.

> To use Yarn or another package manager, remove `package-lock.json` and run the commands below with your chosen manager.

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment variables**

   Copy `.env.example` to `.env.local` and set your variables (e.g. `NEXT_PUBLIC_SITE_URL`, `OPENAI_API_KEY` if using AI features).

3. **Development server**

   ```bash
   npm run dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

   Other commands:

   ```bash
   npm run build   # Production build
   npm run start   # Start production server
   npm run lint    # Run ESLint
   ```

## Tech Stack

- [Next.js](https://nextjs.org) App Router – routing, SEO, React Server Components
- [Tailwind CSS](https://tailwindcss.com) v4 – styling
- [AI SDK](https://sdk.vercel.ai/docs) – optional AI features (OpenAI and other providers)

## License

MIT © 2026 DevToolDock
