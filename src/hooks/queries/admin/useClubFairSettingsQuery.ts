import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../queryKeys';
import { getClubFairSettings } from '../../../apis/admin/adminApi';

/**
 * ClubFair 설정 조회 Query
 * - forceDevelopMode, preEndTime, mainEndTime, afterEndTime 조회
 */
export function useClubFairSettingsQuery() {
  return useQuery({
    queryKey: queryKeys.admin.clubfairSettings(),
    queryFn: getClubFairSettings,
  });
}
