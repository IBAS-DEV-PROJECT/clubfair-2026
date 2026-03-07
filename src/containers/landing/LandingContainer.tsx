import { useNavigate, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { PrimaryButton } from '../../components/shared';
import { useUserAuthStore } from '../../stores/useUserAuthStore';
import useIsTestCompletedQuery from '../../hooks/queries/useIsTestCompletedQuery';
import { useFairStatus } from '../../hooks/queries/admin';
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
  const { status: clubFairStatus } = useFairStatus();

  if (loading || isTestLoading) return null;

  const canAccessMyPage =
    clubFairStatus === ClubFairStatus.MAIN ||
    clubFairStatus === ClubFairStatus.AFTER ||
    clubFairStatus === ClubFairStatus.DEVELOP;
  if (isAuthenticated && isTestCompleted && canAccessMyPage) {
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
