import { corsHeaders } from '../_shared/cors.ts';
import { createSupabaseAdmin } from '../_shared/supabase.ts';

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
    const updateData: UpdateParams = await req.json();

    if (!updateData || Object.keys(updateData).length === 0) {
      throw new Error('업데이트할 데이터가 없습니다.');
    }

    // [핵심] 시간 기반 상태 계산 로직
    // 클라이언트에서 시간을 수정해서 보냈을 때만 계산을 수행합니다.
    const preEnd = updateData.pre_end_time ? new Date(updateData.pre_end_time).getTime() : null;
    const mainEnd = updateData.main_end_time ? new Date(updateData.main_end_time).getTime() : null;
    const afterEnd = updateData.after_end_time
      ? new Date(updateData.after_end_time).getTime()
      : null;

    if (preEnd && mainEnd && afterEnd) {
      const now = Date.now();
      let calculatedStatus = 'CLOSED';

      if (now < preEnd) calculatedStatus = 'PRE';
      else if (now < mainEnd) calculatedStatus = 'MAIN';
      else if (now < afterEnd) calculatedStatus = 'AFTER';

      // 계산된 상태를 업데이트 데이터에 강제로 주입합니다.
      updateData.status = calculatedStatus;
    }

    // DB 업데이트 실행 (id: 1 행 대상)
    const { data: updated, error } = await supabase
      .from('clubfair_settings')
      .update(updateData)
      .eq('id', 1)
      .select()
      .single();

    if (error) throw error;

    return new Response(
      JSON.stringify({
        message: 'success',
        settings: updated,
        calculatedStatus: updateData.status, // 어떤 상태로 계산되었는지 응답에 포함
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
