import { Button } from 'react95';
import styled from 'styled-components';
import { colors } from '../../../styles/colors';
import { EventPrizeWinner } from '../../../apis/admin/adminApi';
import { ClubFairStatus } from '../../../constants/clubFairStatus';

interface EventDrawCardProps {
  drawResult: EventPrizeWinner[] | null;
  isDrawing: boolean;
  currentStatus: ClubFairStatus;
  onDraw: () => void;
}

const Container = styled.div`
  padding: 16px;
  border: 2px solid ${colors.borderDark};
  background: ${colors.canvas};
`;

const StyledTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 14px;
  font-weight: bold;
`;

const InfoSection = styled.div`
  margin-bottom: 16px;
  padding: 12px;
  background: ${colors.material};
  border: 2px inset ${colors.borderLightest};
`;

const InfoText = styled.p`
  margin: 4px 0;
  font-size: 12px;
  color: ${colors.canvasText};
`;

const ResultSection = styled.div`
  margin-top: 16px;
`;

const PrizeGroup = styled.div`
  margin-bottom: 12px;
  padding: 12px;
  border: 2px solid ${colors.borderDark};
  background: ${colors.canvas};
`;

const PrizeHeader = styled.div`
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 8px;
  color: ${colors.canvasText};
`;

const WinnerList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const WinnerItem = styled.li`
  font-size: 12px;
  padding: 4px 0;
  color: ${colors.textMuted};
`;

const ButtonWrapper = styled.div`
  margin-top: 16px;
`;

// 전화번호 마스킹 함수 (010-****-1234)
const maskPhoneNumber = (phone: string): string => {
  if (!phone || phone.length !== 11) return phone;
  return `${phone.slice(0, 3)}-****-${phone.slice(7)}`;
};

const EventDrawCard = ({ drawResult, isDrawing, currentStatus, onDraw }: EventDrawCardProps) => {
  const isAfterPeriod = currentStatus === ClubFairStatus.AFTER;
  const isDrawEnabled = isAfterPeriod;

  return (
    <Container>
      <StyledTitle>EVENT DRAW</StyledTitle>

      <InfoSection>
        <InfoText>🎁 1등 (1명): 치킨</InfoText>
        <InfoText>🎁 2등 (2명): 배스킨라빈스 파인트</InfoText>
        <InfoText>🎁 3등 (4명): 메가커피 아이스 아메리카노</InfoText>
        {!isAfterPeriod && (
          <InfoText style={{ color: colors.error, fontWeight: 'bold' }}>
            AFTER 기간에만 추첨이 가능합니다.
          </InfoText>
        )}
      </InfoSection>

      <ButtonWrapper>
        <Button onClick={onDraw} disabled={!isDrawEnabled || isDrawing} fullWidth>
          {isDrawing ? '추첨 중...' : drawResult ? '재추첨' : '추첨 시작'}
        </Button>
      </ButtonWrapper>

      {drawResult && (
        <ResultSection>
          {drawResult.map((prize) => (
            <PrizeGroup key={prize.rank}>
              <PrizeHeader>
                🏆 {prize.rank}등 - {prize.prize_name} ({prize.winners.length}명)
              </PrizeHeader>
              <WinnerList>
                {prize.winners.map((winner) => (
                  <WinnerItem key={winner.user_id}>
                    • {winner.name} ({maskPhoneNumber(winner.phone)})
                  </WinnerItem>
                ))}
              </WinnerList>
            </PrizeGroup>
          ))}
        </ResultSection>
      )}
    </Container>
  );
};

export default EventDrawCard;
