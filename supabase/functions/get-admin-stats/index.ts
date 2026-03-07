import { corsHeaders } from '../_shared/cors.ts';
import { createSupabaseAdmin } from '../_shared/supabase.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const supabase = createSupabaseAdmin();

    // 오늘 날짜 00:00:00 기준 (KST 9시간 차이 고려 권장)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayISO = today.toISOString();

    // 병렬 쿼리로 데이터 수집
    const [
      { count: todayUsers },
      { count: totalUsers },
      { data: userData }, // gender와 answers를 모두 가져오도록 수정
      { count: eventParticipants },
      { data: gameData }, // 게임 참여자 수를 중복 없이 계산하기 위해 data로 수집
    ] = await Promise.all([
      // 1. 오늘 방문자 (오늘 가입한 유저 기준)
      supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', todayISO),
      // 2. 전체 방문자
      supabase.from('users').select('*', { count: 'exact', head: true }),
      // 3. 성별 및 답변 데이터 (필요한 컬럼 추가)
      supabase.from('users').select('gender, answers'),
      // 4. 이벤트 응모율
      supabase.from('event_entries').select('user_id', { count: 'exact', head: true }),
      // 5. 게임 참여 유저 추출 (중복 제거를 위해 id만 가져옴)
      supabase.from('user_actions').select('user_id').in('detail', ['GAME1', 'GAME2', 'GAME3']), // DB 포맷에 맞춰 공백 제거
    ]);

    const total = totalUsers || 1;

    // 성별 계산
    const maleCount = userData?.filter((u) => u.gender === 0).length || 0;
    const femaleCount = userData?.filter((u) => u.gender === 1).length || 0;
    const totalGenders = maleCount + femaleCount || 1;

    // 테스트 참여 유저 계산 (answers 배열 존재 여부 확인)
    const completedTestCount =
      userData?.filter((u) => Array.isArray(u.answers) && u.answers.length > 0).length || 0;

    // 게임 참여 유저 계산 (Set을 사용하여 user_id 중복 제거)
    const uniqueGamePlayers = new Set(gameData?.map((g) => g.user_id)).size;

    return new Response(
      JSON.stringify({
        todayVisitors: todayUsers || 0,
        totalVisitors: totalUsers || 0,
        genderRatio: {
          male: Math.round((maleCount / totalGenders) * 100),
          female: Math.round((femaleCount / totalGenders) * 100),
        },
        // 이제 userData에 answers가 포함되어 정상 계산됩니다.
        testRate: Math.round((completedTestCount / total) * 100),
        // 게임 참여 유저 비율
        gameRate: Math.round((uniqueGamePlayers / total) * 100),
        // 이벤트 응모율
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
