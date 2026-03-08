import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { Hourglass } from 'react95';
import { useFairStatus } from '../../hooks/queries/admin';
import { ClubFairStatus } from '../../constants';
import PreTestCompleteContent from '../../components/features/user/PreTestCompleteContent';
import PreTesterContainer from '../../containers/user/PreTesterContainer';
import MyResultContainer from '../../containers/user/MyResultContainer';
import MyEventResultContainer from '../../containers/user/MyEventResultContainer';
import useMyResultQuery from '../../hooks/queries/useMyResultQuery';

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

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 40px;
`;

const MyPage = () => {
  const { status, isLoading } = useFairStatus();
  const { data: userResult, isFetching: isResultFetching } = useMyResultQuery();

  if (isLoading) {
    return (
      <LoadingContainer>
        <Hourglass size={32} />
        <p>상태를 확인하는 중입니다...</p>
      </LoadingContainer>
    );
  }

  if (status === ClubFairStatus.CLOSED) {
    return <Navigate to="/" replace />;
  }

  if (status === ClubFairStatus.PRE) {
    return (
      <Wrapper>
        <PreTestCompleteContent />
      </Wrapper>
    );
  }

  // MAIN, DEVELOP, AFTER: 임원진(사전 테스트 참여자) 판별
  // user_actions에 TEST 기록이 없고 answers가 있으면 → PRE 기간에 응답 완료한 임원진
  const hasMainTestRecord =
    userResult?.dotori_history?.some((item) => item.detail === 'TEST') ?? false;
  const isPreTester = !isResultFetching && userResult && !hasMainTestRecord;

  if (
    (status === ClubFairStatus.MAIN ||
      status === ClubFairStatus.DEVELOP ||
      status === ClubFairStatus.AFTER) &&
    isPreTester
  ) {
    return (
      <Wrapper>
        <PreTesterContainer />
      </Wrapper>
    );
  }

  if (status === ClubFairStatus.AFTER) {
    return (
      <Wrapper>
        <MyEventResultContainer />
      </Wrapper>
    );
  }

  // MAIN, DEVELOP 일반 유저: 매칭 결과 + 응모하기
  return (
    <Wrapper>
      <MyResultContainer />
    </Wrapper>
  );
};

export default MyPage;
