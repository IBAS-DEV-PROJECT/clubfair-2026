import { supabase } from '../../libs/supabase';

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

export interface EnterEventParams {
  cost?: number;
}

export interface EnterEventResponse {
  dotori: number;
  action: DotoriHistoryItem;
}

export interface EventResult {
  is_winner: boolean;
  rank?: number;
  prize_name?: string;
  message: string;
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

export async function enterEvent(params: EnterEventParams = {}): Promise<EnterEventResponse> {
  const cost = params.cost ?? 5;

  if (cost <= 0) {
    throw new Error('응모 비용은 1 이상이어야 합니다.');
  }

  // TODO: Supabase RPC로 구현 필요
  throw new Error('Not implemented yet');
}

/**
 * 이벤트 당첨 결과 조회
 * - 당첨: rank와 prize_name 반환
 * - 낙첨: 위로 메시지 반환
 */
export async function getMyEventResult(): Promise<EventResult> {
  const { data, error } = await supabase.rpc('get_my_event_result');

  if (error) {
    console.error('get_my_event_result RPC 에러:', error);
    throw error;
  }

  return data as EventResult;
}
