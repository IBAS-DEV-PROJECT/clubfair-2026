import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TEST_QUESTIONS } from '../../constants/testQuestions';
import QuestionCard from '../../components/features/test/QuestionCard';
import { CompleteTestButton } from '../../components/features/test';
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

const TestContainer = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(10).fill(null));

  const submitMutation = useSubmitTestMutation({
    onSuccess: () => {
      navigate('/my', { replace: true });
    },
    onError: (error: Error) => {
      console.error(error);
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
    // 모든 질문에 답변했는지 확인
    if (answers.some((answer) => answer === null)) {
      alert('모든 질문에 답변해 주세요.');
      return;
    }

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
    </FormWrapper>
  );
};

export default TestContainer;
