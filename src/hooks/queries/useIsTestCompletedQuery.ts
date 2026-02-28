import { useQuery } from '@tanstack/react-query';
import { useUserAuthStore } from '../../stores/useUserAuthStore';
import { supabase } from '../../apis/auth/authApi';
import { queryKeys } from '../queryKeys';

/**
 * 현재 로그인한 사용자가 테스트를 완료했는지 확인하는 Hook
 * Supabase RPC 함수 is_tester_completed() 호출
 */
const useIsTestCompletedQuery = () => {
  const { user } = useUserAuthStore();

  return useQuery({
    queryKey: queryKeys.user.isTestCompleted(user?.id ?? ''),
    queryFn: async () => {
      const { data, error } = await supabase.rpc('is_tester_completed');
      
      if (error) {
        console.error('is_tester_completed RPC 에러:', error);
        throw error;
      }
      
      return data as boolean;
    },
    enabled: !!user, // 로그인 상태일 때만 실행
  });
};

export default useIsTestCompletedQuery;
