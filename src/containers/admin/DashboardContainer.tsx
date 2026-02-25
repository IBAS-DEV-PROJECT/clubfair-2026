import { GroupBox, Hourglass, Window, WindowContent } from 'react95';
import styled from 'styled-components';
import { useAdminDashboardStatsQuery } from '../../hooks/queries/admin';
import DashboardCard from '../../components/features/admin/DashboardCard';

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  gap: 12px;
  text-align: center;
`;

const Message = styled.p`
  font-size: 14px;
  color: #555;
`;

const StyledWindow = styled(Window)`
  width: 100%;
  margin-top: 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 16px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 12px;
  }
`;

const DashboardContainer = () => {
  const { data: stats, isLoading, error } = useAdminDashboardStatsQuery();

  if (isLoading) {
    return (
      <CenteredContainer>
        <Hourglass />
        <Message>통계를 불러오는 중입니다...</Message>
      </CenteredContainer>
    );
  }

  if (error) {
    return (
      <CenteredContainer>
        <Message>통계를 불러올 수 없습니다.</Message>
      </CenteredContainer>
    );
  }

  if (!stats) {
    return (
      <CenteredContainer>
        <Message>통계 데이터가 없습니다.</Message>
      </CenteredContainer>
    );
  }

  const statItems = [
    { label: '오늘 방문자', value: `${stats.visitors_today.toLocaleString()}명` },
    { label: '전체 방문자', value: `${stats.visitors_total.toLocaleString()}명` },
    { label: '성별 비율', value: `남 ${stats.male_ratio}% / 여 ${stats.female_ratio}%` },
    { label: '테스트 참여율', value: `${stats.test_participation_rate}%` },
    { label: '게임 참여율', value: `${stats.game_participation_rate}%` },
    { label: '이벤트 응모율', value: `${stats.event_entry_rate}%` },
  ];

  return (
    <StyledWindow>
      <WindowContent>
        <GroupBox label="Dashboard">
          <StatsGrid>
            {statItems.map((item, index) => (
              <DashboardCard key={index} label={item.label} value={item.value} />
            ))}
          </StatsGrid>
        </GroupBox>
      </WindowContent>
    </StyledWindow>
  );
};

export default DashboardContainer;
