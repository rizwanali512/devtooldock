import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Word Counter Online | Text Analysis and Character Count',
  description:
    'Need accurate word count? Analyze text in seconds. Count words, characters, and sentences, track limits, and optimize content for SEO, essays, and social media.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
