import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

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

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // 관리자 화면에서 필요한 최소 정보만 조회
    const { data: users, error } = await supabase
      .from('users')
      .select('id, name, email, dotori')
      .ilike('phone', `%${lastFourDigits}`);

    if (error) throw error;

    const result =
      users?.map((u) => ({
        user_id: u.id,
        name: u.name,
        email: u.email,
        dotori: u.dotori ?? 0,
      })) ?? [];

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
