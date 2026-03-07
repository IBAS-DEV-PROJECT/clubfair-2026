import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TEST_QUESTIONS } from '../../constants/testQuestions';
import QuestionCard from '../../components/features/test/QuestionCard';
import { CompleteTestButton } from '../../components/features/test';
import { useSubmitTestMutation } from '../../hooks/mutations/test';
import { useClubFairStatus } from '../../hooks/useClubFairStatus';
import { useClubFairSettingsQuery } from '../../hooks/queries/admin';
import { ClubFairStatus } from '../../constants';
import { AlertModal } from '../../components/shared';

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 400px;
`;

const ButtonArea = styled.div`
  height: 20px; /* 제출하기 버튼 높이만큼 고정 */
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

const TestContainer = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(10).fill(null));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // ClubFair 상태 확인
  const { data: settings } = useClubFairSettingsQuery();
  const clubFairStatus = useClubFairStatus(settings);

  const submitMutation = useSubmitTestMutation({
    onSuccess: () => {
      console.log('테스트 제출 성공!');
      console.log('현재 ClubFair 상태:', clubFairStatus);
      
      // PRE 기간에는 사전테스트 완료 페이지로, 그 외에는 로딩 페이지를 거쳐 마이페이지로 이동
      if (clubFairStatus === ClubFairStatus.PRE) {
        console.log('/pre-test-complete로 이동');
        navigate('/pre-test-complete', { replace: true });
      } else {
        console.log('/test-loading으로 이동');
        navigate('/test-loading', { replace: true });
      }
    },
    onError: (error: Error) => {
      console.error('테스트 제출 에러:', error);
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        '테스트 제출에 실패했습니다. 다시 시도해 주세요.';
      setErrorMessage(message);
    },
  });

  const handleAnswerChange = (questionIndex: number, value: number) => {
    // 제출 중에는 추가 입력 방지
    if (submitMutation.isPending) return;

    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);

    // 답변 선택 시 자동으로 다음 질문으로 이동 (마지막 질문이 아닌 경우)
    if (questionIndex < TEST_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(questionIndex + 1);
      }, 300);
    }
  };

  const handleSubmit = () => {
    console.log('제출 버튼 클릭됨');
    console.log('현재 답변:', answers);
    console.log('테스트 제출 시작...');
    
    // null이 아닌 것을 확인했으므로 타입 캐스팅
    submitMutation.mutate({
      answers: answers as number[],
    });
  };

  // 모든 질문에 답변했는지 확인
  const isAllAnswered = answers.every((answer) => answer !== null);
  const currentQuestion = TEST_QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === TEST_QUESTIONS.length - 1;

  return (
    <FormWrapper>
      <QuestionCard
        question={currentQuestion}
        currentNumber={currentQuestionIndex + 1}
        totalNumber={TEST_QUESTIONS.length}
        selectedAnswer={answers[currentQuestionIndex]}
        onAnswerChange={(value) => handleAnswerChange(currentQuestionIndex, value)}
      />
      <ButtonArea>
        {isLastQuestion && isAllAnswered && (
          <CompleteTestButton
            onClick={handleSubmit}
            isPending={submitMutation.isPending}
            // 모든 답변이 완료된 상태에서, 로딩 중일 때만 비활성화
            disabled={submitMutation.isPending}
          />
        )}
      </ButtonArea>
      {errorMessage && (
        <AlertModal message={errorMessage} onClose={() => setErrorMessage(null)} />
      )}
    </FormWrapper>
  );
};

export default TestContainer;
