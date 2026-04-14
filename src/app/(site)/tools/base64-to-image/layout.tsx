import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Base64 to Image Converter |  Fast image Decoder',
  description:
    'Got a Base64 string? Decode it into an image with best online tool. Preview, download, and convert Base64 data into PNG, JPG, or GIF with this fast and easy tool.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

