import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    // 프론트엔드에서 amount를 보내더라도 무시하고 userId와 detail만 받습니다.
    const { userId, detail } = await req.json();

    if (!userId || !detail) {
      return new Response(JSON.stringify({ error: 'userId와 지급 사유(detail)는 필수입니다.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 허용된 지급 사유만 처리 (인스타 팔로우, 스토리 공유, 게임 1~3)
    const allowedDetails = ['FOLLOW', 'STORY', 'GAME1', 'GAME2', 'GAME3'];
    if (!allowedDetails.includes(detail)) {
      return new Response(JSON.stringify({ error: '지원하지 않는 지급 사유입니다.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 1. 서비스 롤 키를 사용하여 RLS를 무시하는 클라이언트 생성
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // 2. 이미 FOLLOW/STORY 보상이 지급된 경우 중복 지급 방지
    if (detail === 'FOLLOW' || detail === 'STORY') {
      const { count: existingCount, error: existingError } = await supabase
        .from('user_actions')
        .select('user_id', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('category', 'MISSION')
        .eq('detail', detail);

      if (existingError) throw existingError;

      if ((existingCount ?? 0) > 0) {
        return new Response(JSON.stringify({ error: '이미 해당 사유로 도토리를 지급했습니다.' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // 3. 현재 도토리 개수 가져오기
    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('dotori')
      .eq('id', userId)
      .single();

    if (fetchError) throw new Error('유저를 찾을 수 없습니다.');

    const newDotori = (user.dotori || 0) + 1;

    // 4. 도토리 개수 업데이트 (무조건 +1 수행)
    const { error: updateError } = await supabase
      .from('users')
      .update({ dotori: newDotori })
      .eq('id', userId);

    if (updateError) throw updateError;

    // 4. 지급 이력 기록 (user_actions 테이블)
    const { error: logError } = await supabase.from('user_actions').insert({
      user_id: userId,
      category: 'MISSION', // 도토리 획득
      detail, // 'FOLLOW', 'STORY', 'GAME1~3' 등
      change: 1, // 무조건 1개 기록
    });

    if (logError) throw logError;

    return new Response(
      JSON.stringify({
        user_id: userId,
        dotori: newDotori,
        action: {
          category: 'MISSION',
          detail,
          change: 1,
          created_at: new Date().toISOString(),
        },
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
