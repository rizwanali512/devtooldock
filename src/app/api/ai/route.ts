import OpenAI from 'openai';
import { getToolPrompt } from '@/lib/getToolPrompt';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type ChatMessageParam = OpenAI.ChatCompletionMessageParam;
type ChatRole = 'user' | 'assistant';

// Basic in-memory rate limit: 10 requests per minute per IP (best-effort)
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60_000;
const hits = new Map<string, number[]>();

function getClientIp(req: Request): string {
  const xf = req.headers.get('x-forwarded-for');
  if (xf) return xf.split(',')[0]?.trim() || 'unknown';
  return req.headers.get('x-real-ip') || 'unknown';
}

function rateLimit(ip: string): { ok: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const list = hits.get(ip) ?? [];
  const recent = list.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    const oldest = recent[0] ?? now;
    const retryAfter = Math.max(1, Math.ceil((RATE_LIMIT_WINDOW_MS - (now - oldest)) / 1000));
    hits.set(ip, recent);
    return { ok: false, retryAfterSec: retryAfter };
  }
  recent.push(now);
  hits.set(ip, recent);
  return { ok: true };
}

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return new Response('Missing OPENAI_API_KEY. Set it in .env.local.', {
        status: 500,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }

    const ip = getClientIp(req);
    const rl = rateLimit(ip);
    if (!rl.ok) {
      return new Response('Rate limit exceeded. Try again shortly.', {
        status: 429,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          ...(rl.retryAfterSec ? { 'Retry-After': String(rl.retryAfterSec) } : {}),
        },
      });
    }

    const body = (await req.json()) as {
      prompt?: string;
      tool?: string;
      messages?: Array<{ role?: string; content?: string }>;
    };
    const tool = body.tool?.trim() || 'unknown';
    const prompt = body.prompt?.trim();

    const systemPrompt = getToolPrompt(tool);

    const userMessages: ChatMessageParam[] =
      Array.isArray(body.messages) && body.messages.length
        ? body.messages
            .map((m) => ({
              role: (m?.role === 'assistant' || m?.role === 'user' ? m.role : 'user') as ChatRole,
              content: String(m?.content ?? '').trim(),
            }))
            .filter((m) => m.content.length > 0)
        : prompt
          ? [{ role: 'user' as const, content: prompt }]
          : [];

    if (userMessages.length === 0) {
      return new Response('Prompt is required.', {
        status: 400,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }

    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      stream: true,
      messages: [{ role: 'system', content: systemPrompt }, ...userMessages],
    });

    const encoder = new TextEncoder();
    return new Response(
      new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of stream) {
              const text = chunk.choices?.[0]?.delta?.content || '';
              if (text) controller.enqueue(encoder.encode(text));
            }
          } finally {
            controller.close();
          }
        },
      }),
      {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache, no-transform',
        },
      }
    );
  } catch (err) {
    return new Response(err instanceof Error ? err.message : 'AI request failed', {
      status: 500,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}

