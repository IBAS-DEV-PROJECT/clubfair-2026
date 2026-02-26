import { ActionCategory, ActionDetail } from '../../constants';
import type { TestResult, DotoriHistoryItem } from '../../types/testResult';

// ===== 타입 정의 =====
export interface SubmitTestAnswersParams {
  answers: number[];
}

// ===== Mock 데이터 =====
const MOCK_PARTNER_INSTAGRAM_ID = 'clubfair_friend_101';
const MOCK_EARNED_DOTORI = 20;
const MOCK_CURRENT_DOTORI = 62;

const MOCK_DOTORI_HISTORY: DotoriHistoryItem[] = [
  {
    category: ActionCategory.MISSION,
    detail: ActionDetail.TEST,
    change: MOCK_EARNED_DOTORI,
    created_at: '2026-02-14T12:00:00.000Z',
  },
];

// ===== API 함수 =====
export async function submitTestAnswers(params: SubmitTestAnswersParams): Promise<TestResult> {
  if (params.answers.length !== 10) {
    throw new Error('테스트 응답은 10개여야 합니다.');
  }

  const answerSum = params.answers.reduce((acc, cur) => acc + cur, 0);
  const score = 70 + (answerSum % 31);

  return Promise.resolve({
    score,
    partner_instagram_id: MOCK_PARTNER_INSTAGRAM_ID,
    dotori: MOCK_CURRENT_DOTORI,
    dotori_history: MOCK_DOTORI_HISTORY,
  });
}
