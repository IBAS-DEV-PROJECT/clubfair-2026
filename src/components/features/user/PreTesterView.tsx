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
  gap: 20px;
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

const ButtonArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
`;

/**
 * MAIN 기간에 사전 테스트 참여자(임원진)가 /my 접속 시 표시
 * - 매칭/도토리 대상에서 제외됨을 안내
 */
const PreTesterView = () => {
  const navigate = useNavigate();

  return (
    <ContentWindow>
      <WindowHeader>사전 테스트 참여 완료</WindowHeader>
      <WindowContent>
        <ContentWrapper>
          <Title>🛠️ 사전 테스트 계정</Title>
          <Message>
            임원진 사전 테스트 기간에 응답을 완료하셨습니다.
            <br />본 계정은 매칭 및 도토리 지급 대상에서 제외됩니다.
          </Message>
          <ButtonArea>
            <PrimaryButton type="navigate" onClick={() => navigate('/admin')}>
              관리자 페이지로 이동
            </PrimaryButton>
            {/* <PrimaryButton type="navigate" onClick={() => navigate('/test')}>
              내 응답 수정하기
            </PrimaryButton> */}
          </ButtonArea>
        </ContentWrapper>
      </WindowContent>
    </ContentWindow>
  );
};

export default PreTesterView;
