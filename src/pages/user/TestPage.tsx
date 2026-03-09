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


const TestPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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
            {currentQuestionIndex > 0 && (
              <Button className="padding: 0px font-size: 16px" onClick={handleGoBack}>&lt;</Button>
            )}
            이상형 테스트
          </HeaderWithButton>
        </WindowHeader>
        <WindowContent>
          <TestContainer 
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
          />
        </WindowContent>
      </FormWindow>
    </Wrapper>
  );
};

export default TestPage;
