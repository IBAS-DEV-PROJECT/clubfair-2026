import styled from 'styled-components';
import { colors } from '../../styles/colors';
import { ClubFairStatus } from '../../constants';

interface CurrentStatusBannerProps {
  currentStatus: ClubFairStatus;
}

const StyledBanner = styled.div`
  padding: 20px;
  background: ${colors.primary};
  color: ${colors.canvasTextInvert};
  border: 3px solid ${colors.borderDarkest};
  text-align: center;
  box-shadow:
    inset -2px -2px 0 ${colors.borderDarkest},
    inset 2px 2px 0 ${colors.borderLightest};
`;

const StyledLabel = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
  opacity: 0.9;
`;

const StyledValue = styled.div`
  font-size: 32px;
  font-weight: bold;
  letter-spacing: 2px;
`;

const StyledTime = styled.div`
  font-size: 12px;
  margin-top: 8px;
  opacity: 0.8;
`;

const CurrentStatusBanner = ({ currentStatus }: CurrentStatusBannerProps) => {
  return (
    <StyledBanner>
      <StyledLabel>CURRENT STATUS</StyledLabel>
      <StyledValue>{currentStatus}</StyledValue>
      <StyledTime>{new Date().toLocaleString('ko-KR')} 기준</StyledTime>
    </StyledBanner>
  );
};

export default CurrentStatusBanner;
