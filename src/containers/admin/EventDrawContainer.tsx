import { useState, useEffect } from 'react';
import { Hourglass } from 'react95';
import styled from 'styled-components';
import { drawEvent, getDrawableUsers, getDrawResult } from '../../apis/admin/adminApi';
import EventDrawCard from '../../components/features/admin/EventDrawCard';
import { useClubFairStatus } from '../../hooks/useClubFairStatus';
import { useClubFairSettingsQuery } from '../../hooks/queries/admin';
import type { EventPrizeWinner } from '../../apis/admin/adminApi';

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

const EventDrawContainer = () => {
  const [drawableCount, setDrawableCount] = useState(0);
  const [drawResult, setDrawResult] = useState<EventPrizeWinner[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);
  const [error, setError] = useState('');

  // ClubFair 설정 및 현재 상태 가져오기
  const { data: settings } = useClubFairSettingsQuery();
  const currentStatus = useClubFairStatus(settings);

  // 초기 데이터 로드
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const [users, existingResult] = await Promise.all([getDrawableUsers(), getDrawResult()]);

        setDrawableCount(users.length);
        if (existingResult) {
          setDrawResult(existingResult.prizes);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : '데이터를 불러올 수 없습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // 추첨 실행
  const handleDraw = async () => {
    try {
      setIsDrawing(true);
      setError('');

      const result = await drawEvent();
      setDrawResult(result.prizes);

      alert('추첨이 완료되었습니다!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '추첨에 실패했습니다.';
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setIsDrawing(false);
    }
  };

  if (isLoading) {
    return (
      <CenteredContainer>
        <Hourglass />
        <Message>추첨 정보를 불러오는 중입니다...</Message>
      </CenteredContainer>
    );
  }

  if (error && !drawResult) {
    return (
      <CenteredContainer>
        <Message>{error}</Message>
      </CenteredContainer>
    );
  }

  return (
    <EventDrawCard
      drawableCount={drawableCount}
      drawResult={drawResult}
      isDrawing={isDrawing}
      currentStatus={currentStatus}
      onDraw={handleDraw}
    />
  );
};

export default EventDrawContainer;
