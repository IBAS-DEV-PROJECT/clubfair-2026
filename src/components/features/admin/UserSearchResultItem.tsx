import { Button } from 'react95';
import styled from 'styled-components';
import { colors } from '../../../styles/colors';
import { AdminUserSearchItem } from '../../../apis/admin/adminApi';

interface UserSearchResultItemProps {
  user: AdminUserSearchItem;
  onGrantClick: () => void;
  disabled?: boolean;
}

const ResultItem = styled.li`
  padding: 12px;
  border: 2px solid ${colors.borderDark};
  background: ${colors.canvas};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const UserName = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.canvasText};

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const DotoriCount = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.canvasText};

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 480px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const UserSearchResultItem = ({ user, onGrantClick, disabled }: UserSearchResultItemProps) => {
  return (
    <ResultItem>
      <UserInfo>
        <UserName>
          {user.name} ({user.email})
        </UserName>
      </UserInfo>
      <Actions>
        <DotoriCount>{user.dotori}개</DotoriCount>
        <Button disabled={disabled} onClick={onGrantClick}>
          증정
        </Button>
      </Actions>
    </ResultItem>
  );
};

export default UserSearchResultItem;
