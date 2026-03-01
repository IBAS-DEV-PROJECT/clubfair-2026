import { useQuery } from '@tanstack/react-query';
import { useUserAuthStore } from '../../stores/useUserAuthStore';
import { getMyResult } from '../../apis/user/userApi';
import { queryKeys } from '../queryKeys';

/**
 * 내 결과 조회 Hook
 * - 매칭 점수
 * - 매칭 상대 인스타 아이디
 * - 도토리 개수
 * - 도토리 내역
 */
const useMyResultQuery = () => {
  const { user } = useUserAuthStore();

  return useQuery({
    queryKey: queryKeys.user.myResult(user?.id ?? ''),
    queryFn: getMyResult,
    enabled: !!user, // 로그인 상태일 때만 실행
  });
};

export default useMyResultQuery;
