import { corsHeaders } from '../_shared/cors.ts';
import { createSupabaseAdmin } from '../_shared/supabase.ts';

/** DB clubfair_settings 싱글톤: status, force_develop_mode, pre_end_time, main_end_time, after_end_time */
interface UpdateParams {
  status?: string;
  force_develop_mode?: boolean;
  pre_end_time?: string;
  main_end_time?: string;
  after_end_time?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const supabase = createSupabaseAdmin();
    const params: UpdateParams = await req.json();

    if (
      params.pre_end_time != null &&
      params.main_end_time != null &&
      params.after_end_time != null
    ) {
      const pre = new Date(params.pre_end_time).getTime();
      const main = new Date(params.main_end_time).getTime();
      const after = new Date(params.after_end_time).getTime();
      if (pre >= main || main >= after) {
        return new Response(
          JSON.stringify({ error: '구간 순서: PRE 종료 < MAIN 종료 < AFTER 종료' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          },
        );
      }
    }

    const { data: existing } = await supabase
      .from('clubfair_settings')
      .select('status, force_develop_mode, pre_end_time, main_end_time, after_end_time')
      .eq('id', 1)
      .single();

    const forceDevelop = params.force_develop_mode ?? existing?.force_develop_mode ?? false;
    const row: Record<string, unknown> = {
      id: 1,
      updated_at: new Date().toISOString(),
      status: forceDevelop ? 'DEVELOP' : (params.status ?? existing?.status ?? 'DEVELOP'),
      force_develop_mode: forceDevelop,
      pre_end_time: params.pre_end_time ?? existing?.pre_end_time,
      main_end_time: params.main_end_time ?? existing?.main_end_time,
      after_end_time: params.after_end_time ?? existing?.after_end_time,
    };

    const { error } = await supabase.from('clubfair_settings').upsert(row);

    if (error) throw error;

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
