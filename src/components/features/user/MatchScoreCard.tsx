import { Window, WindowContent, WindowHeader } from 'react95';
import styled from 'styled-components';
import { colors } from '../../../styles/colors';

interface MatchScoreCardProps {
  score: number;
}

const ScoreText = styled.strong`
  display: block;
  margin-bottom: 8px;
`;

const Divider = styled.hr`
  margin: 8px 0;
  border: none;
  border-top: 1px solid ${colors.divider};
`;

const InfoText = styled.p`
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
  color: ${colors.textMuted};
`;

const MatchScoreCard = ({ score }: MatchScoreCardProps) => {
  return (
    <Window>
      <WindowHeader>매칭 점수</WindowHeader>
      <WindowContent>
        <ScoreText>{score}점</ScoreText>
        <Divider />
        <InfoText>
          • 코사인 유사도: 응답 패턴의 유사도 (0~1)
          <br />• 점수 = 코사인 유사도 × 100
        </InfoText>
      </WindowContent>
    </Window>
  );
};

export default MatchScoreCard;
