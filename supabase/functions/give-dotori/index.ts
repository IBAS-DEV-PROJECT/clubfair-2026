import { corsHeaders } from '../_shared/cors.ts';
import { createSupabaseAdmin } from '../_shared/supabase.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { userId, detail } = await req.json();

    // 1. 유효성 검사
    if (!userId || !detail) {
      throw new Error('userId와 지급 사유(detail)는 필수입니다.');
    }

    // 허용 목록에 'TEST' 추가
    const allowedDetails = ['FOLLOW', 'STORY', 'GAME1', 'GAME2', 'GAME3', 'TEST'];
    if (!allowedDetails.includes(detail)) {
      throw new Error('지원하지 않는 지급 사유입니다.');
    }

    const supabase = createSupabaseAdmin();

    // 2. DB에서 생성한 RPC 함수 호출
    // SECURITY DEFINER 덕분에 rpc 호출 시 RLS를 우회하여 관리자 권한으로 실행됩니다.
    const { data, error: rpcError } = await supabase.rpc('give_dotori_safe', {
      p_user_id: userId, // SQL 함수의 매개변수명과 일치시켜야 합니다.
      p_detail: detail,
    });

    // RPC 내부에서 RAISE EXCEPTION으로 던진 에러(이미 지급됨 등)를 여기서 잡습니다.
    if (rpcError) throw rpcError;

    // 3. 성공 응답 반환
    return new Response(
      JSON.stringify({
        success: true,
        user_id: userId,
        dotori: data.new_dotori,
        detail: detail,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (err) {
    // 에러 발생 시 400 에러와 함께 메시지 전달
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
