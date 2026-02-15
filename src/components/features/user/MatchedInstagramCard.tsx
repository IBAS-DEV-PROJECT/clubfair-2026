import { useState } from 'react';
import { Button, Tooltip, Window, WindowContent, WindowHeader } from 'react95';
import styled from 'styled-components';

interface MatchedInstagramCardProps {
  instagramId: string;
}

const StyledWindowContent = styled(WindowContent)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InstagramIdText = styled.strong`
  display: inline-block;
`;

const StyledTooltip = styled(Tooltip)<{ $show: boolean }>`
  display: ${({ $show }) => ($show ? 'inline-block' : 'none')};
`;

const MatchedInstagramCard = ({ instagramId }: MatchedInstagramCardProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(instagramId);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch (error) {
      console.error('클립보드 복사 실패:', error);
    }
  };

  return (
    <Window>
      <WindowHeader>매칭 결과</WindowHeader>
      <StyledWindowContent>
        <InstagramIdText>@{instagramId}</InstagramIdText>
        <StyledTooltip text="아이디 복사 완료" enterDelay={0} leaveDelay={3000} $show={isCopied}>
          <Button size="sm" onClick={handleCopy}>
            복사
          </Button>
        </StyledTooltip>
      </StyledWindowContent>
    </Window>
  );
};

export default MatchedInstagramCard;
