import { supabase } from '../../libs/supabase';
import type { TestResult } from '../../types/testResult';

// ===== 타입 정의 =====
export interface SubmitTestAnswersParams {
  answers: number[];
}

// ===== API 함수 =====
export async function submitTestAnswers(params: SubmitTestAnswersParams): Promise<TestResult> {
  if (params.answers.length !== 10) {
    throw new Error('테스트 응답은 10개여야 합니다.');
  }

  const { data, error } = await supabase.rpc('submit_test_answers', {
    p_answers: params.answers,
  });

  if (error) throw error;

  return data;
}
