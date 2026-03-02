import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // 오늘 날짜 00:00:00 기준 (KST 고려 시 수동 조정 필요할 수 있음)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayISO = today.toISOString();

    // 병렬 쿼리로 데이터 수집
    const [
      { count: todayUsers },
      { count: totalUsers },
      { data: genderData },
      { count: eventParticipants },
      { count: gameParticipants },
    ] = await Promise.all([
      // 1. 오늘 방문자 (오늘 가입한 유저 기준)
      supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', todayISO),
      // 2. 전체 방문자
      supabase.from('users').select('*', { count: 'exact', head: true }),
      // 3. 성별 비율
      supabase.from('users').select('gender'),
      // 4. 이벤트 응모율 (event_entries에 기록이 있는 유저 수)
      supabase.from('event_entries').select('user_id', { count: 'exact', head: true }),
      // 5. 게임 참여율: user_actions.detail 에 GAME 1, 2, 3 이 한 번이라도 기록된 유저 수
      supabase
        .from('user_actions')
        .select('user_id', { count: 'exact', head: true })
        .in('detail', ['GAME 1', 'GAME 2', 'GAME 3']),
    ]);

    // 성별 계산 (ERD상 int2 타입)
    const maleCount = genderData?.filter((u) => u.gender === 0).length || 0;
    const femaleCount = genderData?.filter((u) => u.gender === 1).length || 0;
    const totalGenders = maleCount + femaleCount || 1;

    // 참여율 계산 (전체 유저 대비 참여자 수)
    const total = totalUsers || 1;

    return new Response(
      JSON.stringify({
        todayVisitors: todayUsers || 0,
        totalVisitors: totalUsers || 0,
        genderRatio: {
          male: Math.round((maleCount / totalGenders) * 100),
          female: Math.round((femaleCount / totalGenders) * 100),
        },
        // 테스트 참여율: users.answers 가 null 이 아닌 유저 비율
        testRate: Math.round(
          ((genderData?.filter((u) => u.answers !== null).length || 0) / total) * 100,
        ),
        // 게임 참여율: user_actions.detail 에 GAME 1/2/3 이 있는 유저 비율
        gameRate: Math.round(((gameParticipants || 0) / total) * 100),
        // 이벤트 응모율: event_entries 에 기록이 있는 유저 비율
        eventRate: Math.round(((eventParticipants || 0) / total) * 100),
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
