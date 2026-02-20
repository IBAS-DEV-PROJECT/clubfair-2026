import { useNavigate, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { PrimaryButton } from '../../components/shared';
import { useUserAuthStore } from '../../stores/useUserAuthStore';
import useUserQuery from '../../hooks/queries/useUserAuthQuery';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;

const LandingContainer = () => {
    const navigate = useNavigate();
    const { isAuthenticated, loading } = useUserAuthStore();
    const { data: userData } = useUserQuery();

    const hasCompletedTest = (userData?.answers?.length ?? 0) > 0;
    
    if (loading) return null;

    // 로그인 + 테스트 완료한 사용자는 즉시 마이페이지로 이동
    if (isAuthenticated && hasCompletedTest) {
        return <Navigate to="/mypage" />;
    }

    return (
        <Container>
            {isAuthenticated && !hasCompletedTest ? (
                <PrimaryButton type='navigate' onClick={() => navigate('/test')}>찾으러 가기</PrimaryButton>
            ) : (
                <>
                <PrimaryButton type='navigate' onClick={() => navigate('/login')}>로그인</PrimaryButton>
                <PrimaryButton type='navigate' onClick={() => navigate('/signup')}>회원가입</PrimaryButton>
                </>
            )}
        </Container>
    )
}

export default LandingContainer;