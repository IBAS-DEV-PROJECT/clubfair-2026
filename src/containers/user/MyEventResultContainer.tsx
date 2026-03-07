import styled from 'styled-components';
import { Hourglass } from 'react95';
import { Window, WindowHeader, WindowContent } from 'react95';
import { PrimaryButton } from '../../components/shared';
import { useNavigate } from 'react-router-dom';
import useEventResultQuery from '../../hooks/queries/useEventResultQuery';
import { useEventDrawInfoQuery } from '../../hooks/queries/useEventDrawInfoQuery';

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 40px;
`;

const ContentWindow = styled(Window)`
  width: 90%;
  max-width: 500px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
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
 * AFTER 기간: 내 당첨 결과 표시
 */
const MyEventResultContainer = () => {
  const navigate = useNavigate();
  const { data: drawInfo, isFetching: isDrawInfoFetching } = useEventDrawInfoQuery();
  const { data: eventResult, isFetching: isResultFetching } = useEventResultQuery();

  const isFetching = isDrawInfoFetching || isResultFetching;

  if (isFetching) {
    return (
      <LoadingContainer>
        <Hourglass size={32} />
        <p>당첨 결과를 불러오는 중입니다...</p>
      </LoadingContainer>
    );
  }

  // 추첨이 아직 진행되지 않음
  if (!drawInfo?.drawResult) {
    return (
      <ContentWindow>
        <WindowHeader>이벤트 당첨 결과</WindowHeader>
        <WindowContent>
          <ContentWrapper>
            <Title>당첨 결과</Title>
            <Message>아직 이벤트 추첨을 하지 않았습니다.</Message>
            <ButtonWrapper>
              <PrimaryButton type="navigate" onClick={() => navigate('/')}>
                홈으로 가기
              </PrimaryButton>
            </ButtonWrapper>
          </ContentWrapper>
        </WindowContent>
      </ContentWindow>
    );
  }

  if (!eventResult) {
    return (
      <LoadingContainer>
        <p>결과를 불러오지 못했습니다.</p>
      </LoadingContainer>
    );
  }

  const { is_winner, rank, prize_name, message } = eventResult;

  return (
    <ContentWindow>
      <WindowHeader>이벤트 당첨 결과</WindowHeader>
      <WindowContent>
        <ContentWrapper>
          {is_winner ? (
            <>
              <Title>🎉 {rank}등 당첨!</Title>
              <Message>{prize_name ?? '상품'}</Message>
            </>
          ) : (
            <>
              <Title>당첨 결과</Title>
              <Message>{message ?? '아쉽지만 내년에 만나요...ㅠㅠ'}</Message>
            </>
          )}
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

export default MyEventResultContainer;
