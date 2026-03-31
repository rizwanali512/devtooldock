import { redirect } from 'next/navigation';

export default function ImageCompressorRedirectPage() {
  redirect('/image-to-base64');
}

