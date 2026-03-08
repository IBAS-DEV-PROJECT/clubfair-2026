import { corsHeaders } from '../_shared/cors.ts';
import { createSupabaseAdmin } from '../_shared/supabase.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const supabase = createSupabaseAdmin();

    // 1. DB에서 설정값 가져오기
    const { data: settings, error } = await supabase
      .from('clubfair_settings')
      .select('*')
      .eq('id', 1)
      .single();

    if (error) throw error;

    // 2. DB의 status를 그대로 currentStatus로 사용
    const currentStatus = settings.status ?? 'CLOSED';

    return new Response(
      JSON.stringify({
        settings, // 전체 설정값 (시간 설정 포함)
        currentStatus, // 화면 전환의 기준이 되는 상태값
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
