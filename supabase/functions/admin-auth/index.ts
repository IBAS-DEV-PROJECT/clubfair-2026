import '@supabase/functions-js/edge-runtime.d.ts';
import { corsHeaders } from '../_shared/cors.ts';
import { jsonResponse } from '../_shared/response.ts';

declare const Deno: {
  serve: (handler: (req: Request) => Promise<Response> | Response) => void;
  env: { get: (key: string) => string | undefined };
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { status: 200, headers: corsHeaders });
  }

  try {
    const { pin } = await req.json();

    const isAdmin = pin === Deno.env.get('ADMIN_PIN');
    const isSuper = pin === Deno.env.get('SUPER_ADMIN_PIN');

    if (isAdmin || isSuper) {
      return jsonResponse({ success: true, role: isSuper ? 'SUPER_ADMIN' : 'ADMIN' });
    }

    return jsonResponse({ success: false, error: '올바르지 않은 PIN입니다.' }, { status: 401 });
  } catch (error) {
    return jsonResponse({ error: (error as Error).message }, { status: 400 });
  }
});
