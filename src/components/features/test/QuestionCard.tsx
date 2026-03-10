import styled from 'styled-components';
import { GroupBox } from 'react95';
import AnswerRadio from './AnswerRadio';
import type { TestQuestion } from '../../../constants/testQuestions';

interface QuestionCardProps {
  question: TestQuestion;
  currentNumber: number;
  totalNumber: number;
  selectedAnswer: number | null;
  onAnswerChange: (value: number) => void;
  disabled?: boolean;
}

const CardWrapper = styled.div`
  margin-bottom: 24px;
`;

const QuestionProgress = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #000080;
  margin-bottom: 20px;
  text-align: center;
`;

const QuestionImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: contain;
  margin-bottom: 12px;
`;

const QuestionText = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const AnswerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const QuestionCard = ({
  question,
  currentNumber,
  totalNumber,
  selectedAnswer,
  onAnswerChange,
  disabled,
}: QuestionCardProps) => {
  return (
    <CardWrapper>
      <QuestionProgress>
        {currentNumber}/{totalNumber}
      </QuestionProgress>
      <GroupBox label={`질문 ${currentNumber}`}>
        {question.imageUrl && (
          <QuestionImage src={question.imageUrl} alt={`질문 ${currentNumber}`} />
        )}
        <QuestionText>{question.question}</QuestionText>
        <AnswerList>
          {question.options.map((option) => (
            <AnswerRadio
              key={option.value}
              name={`question-${question.id}`}
              value={option.value}
              checked={selectedAnswer === option.value}
              label={option.label}
              text={option.text}
              onChange={onAnswerChange}
              disabled={disabled}
            />
          ))}
        </AnswerList>
      </GroupBox>
    </CardWrapper>
  );
};

export default QuestionCard;
