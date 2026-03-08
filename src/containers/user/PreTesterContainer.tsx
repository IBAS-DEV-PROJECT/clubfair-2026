import styled from 'styled-components';
import { Window, WindowHeader, WindowContent } from 'react95';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/shared';
import { useFairStatus } from '../../hooks/queries/admin';
import { ClubFairStatus } from '../../constants';

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
 * MAIN, DEVELOP, AFTER 기간에 사전 테스트 참여자(임원진)가 /my 접속 시 표시
 * - 매칭/도토리 대상에서 제외됨을 안내
 * - AFTER 기간에는 관리자 페이지 버튼 숨김
 */
const PreTesterContainer = () => {
  const navigate = useNavigate();
  const { status } = useFairStatus();

  return (
    <ContentWindow>
      <WindowHeader>사전 테스트 참여 완료</WindowHeader>
      <WindowContent>
        <ContentWrapper>
          <Message>
            임원진 사전 테스트 기간에 응답을 완료하셨습니다.
            <br />본 계정은 도토리 지급 대상에서 제외됩니다.
          </Message>
          <ButtonArea>
            {status !== ClubFairStatus.AFTER && (
              <PrimaryButton type="navigate" onClick={() => navigate('/admin')}>
                관리자 페이지로 이동
              </PrimaryButton>
            )}
          </ButtonArea>
        </ContentWrapper>
      </WindowContent>
    </ContentWindow>
  );
};

export default PreTesterContainer;
