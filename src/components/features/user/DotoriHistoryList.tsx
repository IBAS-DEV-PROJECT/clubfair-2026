import styled from 'styled-components';
import { colors } from '../../../styles/colors';

export interface DotoriHistoryItem {
  id: string;
  label: string;
  change: number;
  createdAt: string;
}

interface DotoriHistoryListProps {
  history: DotoriHistoryItem[];
  emptyMessage?: string;
}

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  border-bottom: 1px solid ${colors.divider};
`;

const DetailText = styled.span`
  flex: 1; // 가변
  min-width: 0;
`;

const ChangeText = styled.span`
  flex-shrink: 0; // 내용물 크기만큼
  white-space: nowrap;
`;

const DateText = styled.span`
  flex-shrink: 0; // 내용물 크기만큼
  white-space: nowrap;
  font-size: 12px;
  color: ${colors.textMuted};
`;

const DotoriHistoryList = ({
  history,
  emptyMessage = '도토리 내역이 없습니다.',
}: DotoriHistoryListProps) => {
  return (
    <>
      {history.length === 0 ? (
        <span>{emptyMessage}</span>
      ) : (
        <StyledList>
          {history.map((item) => (
            <StyledListItem key={item.id}>
              <DetailText>{item.label}</DetailText>
              <ChangeText>{item.change > 0 ? `+${item.change}` : item.change}</ChangeText>
              <DateText>{item.createdAt}</DateText>
            </StyledListItem>
          ))}
        </StyledList>
      )}
    </>
  );
};

export default DotoriHistoryList;
