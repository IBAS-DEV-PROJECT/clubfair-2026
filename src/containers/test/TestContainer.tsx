import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TEST_QUESTIONS } from '../../constants/testQuestions';
import QuestionCard from '../../components/features/test/QuestionCard';
import { CompleteTestButton, TestSubmitLoading } from '../../components/features/test';
import { useSubmitTestMutation } from '../../hooks/mutations/test';

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

interface TestContainerProps {
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  onLoadingChange?: (loading: boolean) => void;
}

const TestContainer = ({
  currentQuestionIndex,
  setCurrentQuestionIndex,
  onLoadingChange,
}: TestContainerProps) => {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(10).fill(null));
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const submitMutation = useSubmitTestMutation({
    onSuccess: () => {
      setIsSubmitSuccess(true);
      // TestSubmitLoading에서 3초 후 /my로 이동
    },
    onError: (error: Error) => {
      console.error('테스트 제출 에러:', error);
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        '테스트 제출에 실패했습니다. 다시 시도해 주세요.';
      alert(message);
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

  const isLoading = isSubmitSuccess || submitMutation.isPending;
  useEffect(() => {
    onLoadingChange?.(isLoading);
  }, [isLoading, onLoadingChange]);

  // 질문 전환 시 이미지 로딩 지연 방지: 모든 이미지 미리 로드
  useEffect(() => {
    TEST_QUESTIONS.forEach((q) => {
      if (q.imageUrl) {
        const img = new Image();
        img.src = q.imageUrl;
      }
    });
  }, []);

  if (isSubmitSuccess) {
    return <TestSubmitLoading />;
  }

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
    </FormWrapper>
  );
};

export default TestContainer;
