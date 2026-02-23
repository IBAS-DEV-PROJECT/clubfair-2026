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
`;

const StatLabel = styled.span`
  font-size: 12px;
  color: ${colors.textMuted};
  font-weight: bold;
`;

const StatValue = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.canvasText};
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
