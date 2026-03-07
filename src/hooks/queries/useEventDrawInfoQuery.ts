import { useQuery } from '@tanstack/react-query';
import { getEventDrawInfo } from '../../apis/admin/adminApi';
import { queryKeys } from '../queryKeys';

/**
 * 이벤트 추첨 결과 조회 (추첨 진행 여부 확인용)
 * - drawResult가 null이면 아직 추첨 미진행
 */
export function useEventDrawInfoQuery() {
  return useQuery({
    queryKey: queryKeys.user.eventDrawInfo(),
    queryFn: getEventDrawInfo,
  });
}
