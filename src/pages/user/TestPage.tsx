import { useState } from 'react';
import styled from 'styled-components';
import { Window, WindowHeader, WindowContent, Button } from 'react95';
import TestContainer from '../../containers/test/TestContainer';

const Wrapper = styled.div`
  min-height: calc(100vh - 88px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 40px 20px;
  margin-top: 40px;
`;

const FormWindow = styled(Window)`
  width: 90%;
  max-width: 600px;
`;

const HeaderWithButton = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const BackButton = styled(Button)`
  padding: 0;
  font-size: 16px;
`;

const TestPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <Wrapper>
      <FormWindow>
        <WindowHeader>
          <HeaderWithButton>
            {currentQuestionIndex > 0 && !isLoading && (
              <BackButton onClick={handleGoBack}>&lt;</BackButton>
            )}
            이상형 테스트
          </HeaderWithButton>
        </WindowHeader>
        <WindowContent>
          <TestContainer
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            onLoadingChange={setIsLoading}
          />
        </WindowContent>
      </FormWindow>
    </Wrapper>
  );
};

export default TestPage;
