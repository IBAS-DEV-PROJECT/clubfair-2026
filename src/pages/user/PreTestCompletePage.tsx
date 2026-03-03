import styled from 'styled-components';
import { Window, WindowHeader, WindowContent } from 'react95';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/shared';

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

const ContentWindow = styled(Window)`
  width: 90%;
  max-width: 500px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px 0;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin: 0;
  color: #000080;
`;

const Message = styled.p`
  font-size: 14px;
  line-height: 1.6;
  text-align: center;
  margin: 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
`;

const PreTestCompletePage = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <ContentWindow>
        <WindowHeader>테스트 완료</WindowHeader>
        <WindowContent>
          <ContentWrapper>
            <Title>사전테스트에 참여해주셔서 감사합니다</Title>
            <Message>
              동아리 박람회 기간 (3/10 ~ 3/12)까지
              <br />
              조금만 기다려주세요!
            </Message>
            <ButtonWrapper>
              <PrimaryButton type="navigate" onClick={() => navigate('/')}>
                홈으로 가기
              </PrimaryButton>
            </ButtonWrapper>
          </ContentWrapper>
        </WindowContent>
      </ContentWindow>
    </Wrapper>
  );
};

export default PreTestCompletePage;
