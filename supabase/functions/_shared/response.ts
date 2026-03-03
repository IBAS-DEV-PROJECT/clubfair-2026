import { corsHeaders } from './cors.ts';

export function jsonResponse(
  data: unknown,
  init: { status?: number; headers?: Record<string, string> } = {},
): Response {
  return new Response(JSON.stringify(data), {
    status: init.status ?? 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json', ...init.headers },
  });
}
