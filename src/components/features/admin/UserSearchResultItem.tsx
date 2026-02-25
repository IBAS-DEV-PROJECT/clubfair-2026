import styled from 'styled-components';
import { colors } from '../../../styles/colors';
import { AdminUserSearchItem } from '../../../apis/admin/adminApi';

interface UserSearchResultItemProps {
  user: AdminUserSearchItem;
  isSelected: boolean;
  onClick: () => void;
}

const ResultItem = styled.li<{ $isSelected: boolean }>`
  padding: 12px;
  border: 2px solid
    ${({ $isSelected }) => ($isSelected ? colors.headerBackground : colors.borderDark)};
  background: ${({ $isSelected }) => ($isSelected ? colors.material : colors.canvas)};
  display: flex;
  justify-content: space-between;
  align-items: center;
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
`;

const UserDetail = styled.span`
  font-size: 12px;
  color: ${colors.textMuted};
`;

const DotoriCount = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.canvasText};
`;

const UserSearchResultItem = ({ user, isSelected, onClick }: UserSearchResultItemProps) => {
  return (
    <ResultItem $isSelected={isSelected} onClick={onClick}>
      <UserInfo>
        <UserName>{user.name}</UserName>
        {/* <UserDetail>전화번호: ****-{user.phone_last4}</UserDetail> */}
      </UserInfo>
      <DotoriCount>도토리: {user.dotori}개</DotoriCount>
    </ResultItem>
  );
};

export default UserSearchResultItem;
