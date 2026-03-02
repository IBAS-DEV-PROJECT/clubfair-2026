import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  );

  // 1. DB에서 설정값 가져오기
  const { data: settings, error } = await supabase.from('clubfair_settings').select('*').single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // 2. currentStatus: force_develop_mode면 DEVELOP, 아니면 구간 종료 시각 기준 계산
  let currentStatus = settings.status ?? 'CLOSED';
  if (settings.force_develop_mode) {
    currentStatus = 'DEVELOP';
  } else if (
    settings.pre_end_time != null &&
    settings.main_end_time != null &&
    settings.after_end_time != null
  ) {
    const now = Date.now();
    const preEnd = new Date(settings.pre_end_time).getTime();
    const mainEnd = new Date(settings.main_end_time).getTime();
    const afterEnd = new Date(settings.after_end_time).getTime();
    if (now < preEnd) currentStatus = 'PRE';
    else if (now < mainEnd) currentStatus = 'MAIN';
    else if (now < afterEnd) currentStatus = 'AFTER';
    else currentStatus = 'CLOSED';
  }

  return new Response(
    JSON.stringify({
      settings,
      currentStatus,
    }),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    },
  );
});
