import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // 1. 기존 추첨 결과 (event_winners + users 조인)
    const { data: winners, error: winnersError } = await supabase
      .from('event_winners')
      .select('user_id, rank, drawn_at');

    if (winnersError) throw winnersError;

    if (!winners || winners.length === 0) {
      return new Response(JSON.stringify({ drawResult: null }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const userIds = winners.map((w) => w.user_id);

    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, name, phone')
      .in('id', userIds);

    if (usersError) throw usersError;

    const userMap = new Map<string, { name: string; phone: string }>();
    (users ?? []).forEach((u) => {
      userMap.set(u.id, { name: u.name, phone: u.phone });
    });

    const winnersWithProfile = winners.map((w) => {
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

    const drawnAt = winners[0]?.drawn_at ?? new Date().toISOString();

    const drawResult = {
      draw_id: `draw_${Date.now()}`,
      drawn_at: drawnAt,
      prizes: [
        { rank: 1, prize_name: '치킨', winners: first },
        { rank: 2, prize_name: '배스킨라빈스 파인트', winners: second },
        { rank: 3, prize_name: '메가커피 아이스 아메리카노', winners: third },
      ],
    };

    return new Response(JSON.stringify({ drawResult }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
