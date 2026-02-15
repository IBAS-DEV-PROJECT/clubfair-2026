import { useState } from 'react';
import styled from 'styled-components';
import { Button, Window, WindowContent, WindowHeader } from 'react95';
import DotoriHistoryList, { type DotoriHistoryItem } from './DotoriHistoryList';
import { colors } from '../../../styles/colors';

interface DotoriCardProps {
  dotori: number;
  history: DotoriHistoryItem[];
}

const AmountRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const HistorySection = styled.div`
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid ${colors.divider};
  max-height: 144px;
  overflow-y: auto;
`;

const ToggleButton = styled(Button)`
  flex-shrink: 0;
`;

const DotoriCard = ({ dotori, history }: DotoriCardProps) => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  return (
    <Window>
      <WindowHeader>내 도토리</WindowHeader>
      <WindowContent>
        <AmountRow>
          <strong>{dotori}개</strong>
          <ToggleButton onClick={() => setIsHistoryOpen((prev) => !prev)}>
            {isHistoryOpen ? '닫기 ▲' : '내역 보기 ▼'}
          </ToggleButton>
        </AmountRow>
        {isHistoryOpen ? (
          <HistorySection>
            <DotoriHistoryList history={history} />
          </HistorySection>
        ) : null}
      </WindowContent>
    </Window>
  );
};

export default DotoriCard;
