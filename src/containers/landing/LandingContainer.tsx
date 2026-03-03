import { useNavigate, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { PrimaryButton } from '../../components/shared';
import { useUserAuthStore } from '../../stores/useUserAuthStore';
import useIsTestCompletedQuery from '../../hooks/queries/useIsTestCompletedQuery';
import { useClubFairStatus } from '../../hooks/useClubFairStatus';
import { useClubFairSettingsQuery } from '../../hooks/queries/admin';
import { ClubFairStatus } from '../../constants';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;

const LandingContainer = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useUserAuthStore();
  const { data: isTestCompleted, isLoading: isTestLoading } = useIsTestCompletedQuery();
  const { data: settings } = useClubFairSettingsQuery();
  const clubFairStatus = useClubFairStatus(settings);

  if (loading || isTestLoading) return null;

  // 로그인 + 테스트 완료한 사용자는 PRE 기간이 아닐 때만 마이페이지로 이동
  // PRE 기간에는 사전테스트 완료 페이지를 거쳤으므로 홈에 남아있음
  if (isAuthenticated && isTestCompleted && clubFairStatus !== ClubFairStatus.PRE) {
    return <Navigate to="/my" />;
  }

  return (
    <Container>
      {isAuthenticated && !isTestCompleted ? (
        <PrimaryButton type="navigate" onClick={() => navigate('/test')}>
          찾으러 가기
        </PrimaryButton>
      ) : (
        <>
          <PrimaryButton type="navigate" onClick={() => navigate('/login')}>
            로그인
          </PrimaryButton>
          <PrimaryButton type="navigate" onClick={() => navigate('/signup')}>
            회원가입
          </PrimaryButton>
        </>
      )}
    </Container>
  );
};

export default LandingContainer;
