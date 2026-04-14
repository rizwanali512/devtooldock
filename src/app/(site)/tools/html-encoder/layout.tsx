import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free HTML Encoder Online | Encode HTML Entities In seconds',
  description:
    'HTML breaking your code? Encode special characters like <, >, and & in seconds. Protect your content, prevent errors, and display HTML safely across browsers.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
