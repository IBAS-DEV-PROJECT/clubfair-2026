import { corsHeaders } from '../_shared/cors.ts';
import { createSupabaseAdmin } from '../_shared/supabase.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const supabase = createSupabaseAdmin();

    // 1. 박람회 상태 체크 (CLOSED 인지 확인)
    const { data: settings, error: settingsError } = await supabase
      .from('clubfair_settings')
      .select('status')
      .eq('id', 1)
      .single();

    if (settingsError || settings.status !== 'CLOSED') {
      throw new Error('박람회가 종료(CLOSED)된 상태에서만 추첨이 가능합니다.');
    }

    // 2. 응모자 목록 가져오기 (entry_id 기록을 위해 id도 함께 가져옴)
    const { data: entries, error: fetchError } = await supabase
      .from('event_entries')
      .select('id, user_id');

    if (fetchError) throw fetchError;
    if (!entries || entries.length < 7) {
      throw new Error('응모자가 부족하여 추첨을 진행할 수 없습니다. (최소 7명 필요)');
    }

    // 3. 중복 당첨 방지: 유저별로 가장 먼저 생성된 응모권 하나씩만 남기기
    const uniqueParticipants = Array.from(
      entries.reduce((map, entry) => {
        if (!map.has(entry.user_id)) map.set(entry.user_id, entry.id);
        return map;
      }, new Map<string, number>()),
    ) as [string, number][];

    // 4. 무작위 셔플 (Fisher-Yates Shuffle)
    for (let i = uniqueParticipants.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [uniqueParticipants[i], uniqueParticipants[j]] = [
        uniqueParticipants[j],
        uniqueParticipants[i],
      ];
    }

    const drawTimestamp = new Date().toISOString();

    // 5. 등수별 당첨자 데이터 생성 (1등 1명, 2등 2명, 3등 4명)
    const winnersData = uniqueParticipants.slice(0, 7).map(([userId, entryId], index) => {
      let rank = 3;
      if (index === 0) rank = 1;
      else if (index < 3) rank = 2;

      return {
        user_id: userId,
        entry_id: entryId, // DB 컬럼명 일치
        rank,
        drawn_at: drawTimestamp,
      };
    });

    // 6. 기존 당첨 데이터가 있다면 삭제 (재추첨 대비 선택 사항)
    await supabase.from('event_winners').delete().neq('id', 0);

    // 7. event_winners 테이블에 저장
    const { error: insertError } = await supabase.from('event_winners').insert(winnersData);

    if (insertError) throw insertError;

    // 8. 당첨자 프로필 정보 조회 (이름, 전화번호)
    const winnerUserIds = winnersData.map((w) => w.user_id);
    const { data: winnerUsers, error: usersError } = await supabase
      .from('users')
      .select('id, name, phone')
      .in('id', winnerUserIds);

    if (usersError) throw usersError;

    const userMap = new Map<string, { name: string; phone: string }>();
    (winnerUsers ?? []).forEach((u) => {
      userMap.set(u.id, { name: u.name, phone: u.phone });
    });

    // 9. 프론트에서 사용하는 결과 형태로 변환
    const winnersWithProfile = winnersData.map((w) => {
      const user = userMap.get(w.user_id);
      return {
        user_id: w.user_id,
        name: user?.name ?? '알 수 없음',
        phone: user?.phone ?? '',
        rank: w.rank,
      };
    });

    const first = winnersWithProfile.filter((w) => w.rank === 1);
    const second = winnersWithProfile.filter((w) => w.rank === 2);
    const third = winnersWithProfile.filter((w) => w.rank === 3);

    const responseBody = {
      draw_id: `draw_${Date.now()}`,
      drawn_at: drawTimestamp,
      prizes: [
        { rank: 1, prize_name: '치킨', winners: first },
        { rank: 2, prize_name: '배스킨라빈스 파인트', winners: second },
        { rank: 3, prize_name: '메가커피 아이스 아메리카노', winners: third },
      ],
    };

    return new Response(JSON.stringify(responseBody), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
