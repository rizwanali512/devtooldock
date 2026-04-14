import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Regex Tester | Build, test and Debug regex Instantly',
  description:
    'Struggling with regex? Test patterns in seconds with live results, error detection, and match highlighting. Perfect for validating input, parsing data, and debugging code.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
