import styled from 'styled-components';
import { Window, WindowHeader, WindowContent } from 'react95';
import LoginContainer from '../../containers/auth/LoginContainer';

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
  max-width: 480px;
`;

const LoginPage = () => {
  return (
    <Wrapper>
      <FormWindow>
        <WindowHeader>로그인</WindowHeader>
        <WindowContent>
          <LoginContainer />
        </WindowContent>
      </FormWindow>
    </Wrapper>
  );
};

export default LoginPage;
