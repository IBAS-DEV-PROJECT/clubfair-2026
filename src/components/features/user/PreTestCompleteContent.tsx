import styled from 'styled-components';
import { Window, WindowHeader, WindowContent } from 'react95';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../shared';

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

/**
 * 사전테스트 완료(PRE) 시 MyPage에 표시되는 콘텐츠
 */
const PreTestCompleteContent = () => {
  const navigate = useNavigate();

  return (
    <ContentWindow>
      <WindowHeader>테스트 완료</WindowHeader>
      <WindowContent>
        <ContentWrapper>
          <Title>사전테스트에 참여해 주셔서 감사합니다.</Title>
          <Message>
            동아리 박람회 기간 (3/10 ~ 3/12)까지
            <br />
            조금만 기다려 주세요!
          </Message>
          <ButtonWrapper>
            <PrimaryButton type="navigate" onClick={() => navigate('/')}>
              홈으로 가기
            </PrimaryButton>
          </ButtonWrapper>
        </ContentWrapper>
      </WindowContent>
    </ContentWindow>
  );
};

export default PreTestCompleteContent;
