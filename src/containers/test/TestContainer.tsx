import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { submitTestAnswers } from '../../apis/test/testApi';
import { TEST_QUESTIONS } from '../../constants/testQuestions';
import QuestionCard from '../../components/features/test/QuestionCard';
import { TestSubmitButton } from '../../components/features/test';
import { useTestResultStore } from '../../stores/useTestResultStore';

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 400px;
`;

const ButtonArea = styled.div`
  height: 20px;  /* 제출하기 버튼 높이만큼 고정 */
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

const TestContainer = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(10).fill(null));
  const { setResult } = useTestResultStore();

  // 테스트 제출 mutation
  const submitMutation = useMutation({
    mutationFn: submitTestAnswers,
    onSuccess: (data) => {
        setResult(data);
      navigate('/my');
    },
    onError: (error: any) => {
      console.error(error);
      alert('테스트 제출에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const handleAnswerChange = (questionIndex: number, value: number) => {
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
      alert('모든 질문에 답변해주세요.');
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
            <TestSubmitButton
                onClick={handleSubmit}
                isPending={submitMutation.isPending}
                disabled={!isAllAnswered}
             />
    )}
    </ButtonArea>
    </FormWrapper>
  );
};

export default TestContainer;
