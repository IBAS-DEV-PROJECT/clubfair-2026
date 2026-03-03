import styled from 'styled-components';
import { colors } from '../../../styles/colors';

interface DashboardCardProps {
  label: string;
  value: string;
}

const StyledCard = styled.div`
  padding: 16px;
  border: 2px solid ${colors.borderDark};
  background: ${colors.canvas};
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 480px) {
    padding: 12px;
    gap: 8px;
  }
`;

const StatLabel = styled.span`
  font-size: 12px;
  color: ${colors.textMuted};
  font-weight: bold;

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

const StatValue = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.canvasText};

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const DashboardCard = ({ label, value }: DashboardCardProps) => {
  return (
    <StyledCard>
      <StatLabel>{label}</StatLabel>
      <StatValue>{value}</StatValue>
    </StyledCard>
  );
};

export default DashboardCard;
