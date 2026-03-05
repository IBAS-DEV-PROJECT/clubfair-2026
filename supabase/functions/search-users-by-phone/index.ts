import { corsHeaders } from '../_shared/cors.ts';
import { createSupabaseAdmin } from '../_shared/supabase.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { lastFourDigits } = await req.json();

    // 4자리 숫자 검증
    if (!lastFourDigits || !/^\d{4}$/.test(lastFourDigits)) {
      return new Response(JSON.stringify({ error: '전화번호 뒷 4자리를 정확히 입력해주세요.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createSupabaseAdmin();

    // 관리자 화면에서 필요한 최소 정보만 조회
    const { data: users, error } = await supabase
      .from('users')
      .select('id, name, email, dotori')
      .ilike('phone', `%${lastFourDigits}`);

    if (error) throw error;

    if (!users || users.length === 0) {
      return new Response(JSON.stringify({ users: [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const userIds = users.map((u) => u.id);

    // 각 유저별 인스타 팔로우 / 스토리 인증 여부 조회
    const { data: actions, error: actionsError } = await supabase
      .from('user_actions')
      .select('user_id, detail')
      .in('user_id', userIds)
      .eq('category', 'MISSION')
      .in('detail', ['FOLLOW', 'STORY']);

    if (actionsError) throw actionsError;

    const actionMap = new Map<
      string,
      {
        hasFollow: boolean;
        hasStory: boolean;
      }
    >();

    (actions ?? []).forEach((a) => {
      const current = actionMap.get(a.user_id) ?? { hasFollow: false, hasStory: false };
      if (a.detail === 'FOLLOW') current.hasFollow = true;
      if (a.detail === 'STORY') current.hasStory = true;
      actionMap.set(a.user_id, current);
    });

    const result =
      users.map((u) => {
        const flags = actionMap.get(u.id) ?? { hasFollow: false, hasStory: false };
        return {
          user_id: u.id,
          name: u.name,
          email: u.email,
          dotori: u.dotori ?? 0,
          canGiveFollow: !flags.hasFollow,
          canGiveStory: !flags.hasStory,
        };
      }) ?? [];

    return new Response(JSON.stringify({ users: result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
