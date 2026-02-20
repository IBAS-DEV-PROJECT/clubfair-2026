import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Hourglass } from 'react95';
import { useUserAuthStore } from '../stores/useUserAuthStore';
import useUserQuery from '../hooks/queries/useUserAuthQuery';

interface ProtectedUserLayoutProps {
  requiredTest?: boolean;
}

const ProtectedUserLayout = ({ requiredTest = true }: ProtectedUserLayoutProps) => {
  const { isAuthenticated, loading, init } = useUserAuthStore();
  const { data: userData, isFetching: isUserFetching } = useUserQuery();

  useEffect(() => {
    init();
  }, []);

  if (loading || isUserFetching) {
    return (
      <>
        <Hourglass size={32} />
        <p>확인 중입니다.</p>
      </>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredTest && !(userData?.answers && userData.answers.length > 0)) {
    return <Navigate to="/test" replace />;
  }

  return <Outlet />;
};

export default ProtectedUserLayout;
