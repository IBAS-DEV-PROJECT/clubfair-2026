import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../libs/supabase';
import { queryKeys } from '../../queryKeys';
import { useClubFairSettingsQuery } from './useClubFairSettingsQuery';
import { ClubFairStatus } from '../../../constants';

/**
 * 박람회 상태(Fair Status) 조회 훅
 * - useClubFairSettingsQuery 기반으로 status enum 반환
 * - clubfair_settings 테이블 실시간 구독으로 변경 시 캐시 무효화
 */
export const useFairStatus = () => {
  const queryClient = useQueryClient();
  const queryResult = useClubFairSettingsQuery();

  // clubfair_settings 테이블 UPDATE 시 캐시 무효화 → useClubFairSettingsQuery 재조회
  useEffect(() => {
    const channel = supabase
      .channel('fair-status-live')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'clubfair_settings',
        },
        (payload) => {
          // 1. 페이로드 전체 로깅
          console.log('🔔 실시간 페이로드 도착:', payload);

          // 2. 데이터 변경 확인 후 쿼리 무효화
          if (payload.new) {
            console.log('🔄 데이터 갱신 시도 중...');
            queryClient.invalidateQueries({ queryKey: queryKeys.admin.clubfairSettings() });
          }
        },
      )
      .subscribe((status) => {
        // 3. 구독 상태 로깅 (SUBSCRIBED가 떠야 정상입니다)
        console.log('📡 구독 상태:', status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const rawStatus = queryResult.data?.status;
  const status =
    rawStatus && Object.values(ClubFairStatus).includes(rawStatus as ClubFairStatus)
      ? (rawStatus as ClubFairStatus)
      : ClubFairStatus.CLOSED;

  return {
    ...queryResult,
    status,
  };
};
