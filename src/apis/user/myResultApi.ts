import { supabase } from "../../libs/supabase";

// ===== 타입 정의 =====
export interface DotoriHistoryItem {
  category: 'MISSION' | 'PURCHASE';
  detail: 'TEST' | 'FOLLOW' | 'STORY' | 'GAME1' | 'GAME2' | 'GAME3' | 'EVENT';
  change: number;
  created_at: string;
}

export interface MyResult {
  score: number | null;
  partner_instagram_id: string | null;
  dotori: number;
  dotori_history: DotoriHistoryItem[];
}

// ===== API 함수 =====
/**
 * 내 결과 조회
 * - 매칭 점수
 * - 매칭 상대 인스타 아이디
 * - 도토리 개수
 * - 도토리 내역 (전체, 최신순)
 */
export async function getMyResult(): Promise<MyResult> {
  const { data, error } = await supabase.rpc('get_my_result');

  if (error) {
    console.error('get_my_result RPC 에러:', error);
    throw error;
  }

  return data as MyResult;
}
