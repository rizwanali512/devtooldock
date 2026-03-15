import { addResult } from '@/lib/result-storage';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { toolSlug, input, output } = body as {
      toolSlug?: string;
      input?: string;
      output?: string;
    };
    if (!toolSlug || typeof input !== 'string' || typeof output !== 'string') {
      return NextResponse.json(
        { error: 'Missing toolSlug, input, or output' },
        { status: 400 }
      );
    }
    const id = addResult(toolSlug, input, output);
    return NextResponse.json({ id });
  } catch {
    return NextResponse.json({ error: 'Failed to save result' }, { status: 500 });
  }
}
