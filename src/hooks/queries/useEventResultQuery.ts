import { useQuery } from '@tanstack/react-query';
import { useUserAuthStore } from '../../stores/useUserAuthStore';
import { getMyEventResult } from '../../apis/user/userApi';
import { queryKeys } from '../queryKeys';

/**
 * 이벤트 당첨 결과 조회 Hook
 * - 당첨자: rank, prize_name 포함
 * - 낙첨자: 위로 메시지
 */
const useEventResultQuery = () => {
  const { user } = useUserAuthStore();

  return useQuery({
    queryKey: queryKeys.user.eventResult(user?.id ?? ''),
    queryFn: getMyEventResult,
    enabled: !!user, // 로그인 상태일 때만 실행
  });
};

export default useEventResultQuery;
