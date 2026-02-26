import type { UserAction } from './db';

// 테스트/마이페이지에서 공통으로 사용하는 테스트 결과 타입들

export type DotoriHistoryItem = Pick<UserAction, 'category' | 'detail' | 'change' | 'created_at'>;

export interface TestResult {
  score: number;
  partner_instagram_id: string;
  dotori: number;
  dotori_history: DotoriHistoryItem[];
}
