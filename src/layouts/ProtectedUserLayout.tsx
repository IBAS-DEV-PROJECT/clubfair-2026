import { Navigate, Outlet } from 'react-router-dom';
import { Hourglass } from 'react95';
import { useUserAuthStore } from '../stores/useUserAuthStore';
import useUserAuthQuery from '../hooks/queries/useUserAuthQuery';

interface ProtectedUserLayoutProps {
  requiredTest?: boolean;
}

const ProtectedUserLayout = ({ requiredTest = true }: ProtectedUserLayoutProps) => {
  const { isAuthenticated, loading } = useUserAuthStore();
  const { data: userData, isFetching: isUserFetching } = useUserAuthQuery();

  if (loading || isUserFetching) {
    return (
      <>
        <Hourglass size={32} />
        <p>확인 중입니다.</p>
      </>
    );
  }

  // 미로그인 사용자가 test, my 페이지에 접근할 경우 랜딩 페이지로 리다이렉트
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // 테스트 미완료 사용자가 my 페이지에 접근할 경우 테스트 페이지로 리다이렉트
  if (requiredTest && !(userData?.answers && userData.answers.length > 0)) {
    return <Navigate to="/test" replace />;
  }

  return <Outlet />;
};

export default ProtectedUserLayout;
