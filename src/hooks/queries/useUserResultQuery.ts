import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../queryKeys';
import { getUserResult } from '../../apis/user/userApi';

export function useUserResultQuery() {
  return useQuery({
    queryKey: queryKeys.user.userResult(),
    queryFn: getUserResult,
    staleTime: 1000 * 60 * 5, // 5분
  });
}
