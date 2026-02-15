import styled from 'styled-components';
import MyResultContainer from '../../containers/user/MyResultContainer';

const Wrapper = styled.div`
  min-height: calc(100vh - 88px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding: 12px;

  > * {
    width: 90%;
  }
`;

const MyPage = () => {
  return (
    <Wrapper>
      <MyResultContainer />
    </Wrapper>
  );
};

export default MyPage;
