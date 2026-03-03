import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { useAdminStore } from '../stores/useAdminStore';
import { AdminRole } from '../constants';
import PinAuthContainer from '../containers/admin/PinAuthContainer';

interface ProtectedAdminLayoutProps {
  requiredRole: AdminRole;
}

const StyledContainer = styled.div<{ $isAuthScreen: boolean }>`
  height: calc(100vh - 88px);
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${({ $isAuthScreen }) => ($isAuthScreen ? 'center' : 'flex-start')};
  overflow-y: auto;
`;

// Role에 따른 인증 타이틀 자동 결정
const getAuthTitle = (role: AdminRole): string => {
  switch (role) {
    case AdminRole.ADMIN:
      return 'Admin 로그인';
    case AdminRole.SUPER_ADMIN:
      return 'Setting 로그인';
    default:
      return 'Admin 인증';
  }
};

const ProtectedAdminLayout = ({ requiredRole }: ProtectedAdminLayoutProps) => {
  const { role, isAuthenticated } = useAdminStore();

  // 권한 체크 (각 페이지는 독립적인 PIN 인증 필요)
  const hasPermission = () => {
    if (!isAuthenticated || !role) return false;

    // 요구되는 role과 정확히 일치해야 함
    return role === requiredRole;
  };

  if (!hasPermission()) {
    return (
      <StyledContainer $isAuthScreen={true}>
        <PinAuthContainer title={getAuthTitle(requiredRole)} />
      </StyledContainer>
    );
  }

  return (
    <StyledContainer $isAuthScreen={false}>
      <Outlet />
    </StyledContainer>
  );
};

export default ProtectedAdminLayout;
