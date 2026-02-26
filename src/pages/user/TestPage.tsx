import styled from 'styled-components';
import { Window, WindowHeader, WindowContent } from 'react95';
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

const TestPage = () => {
  return (
    <Wrapper>
      <FormWindow>
        <WindowHeader>이상형 테스트</WindowHeader>
        <WindowContent>
          <TestContainer />
        </WindowContent>
      </FormWindow>
    </Wrapper>
  );
};

export default TestPage;
