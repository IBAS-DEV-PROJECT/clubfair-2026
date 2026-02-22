import { useQuery } from '@tanstack/react-query';
import { useUserAuthStore } from '../../stores/useUserAuthStore';
import { supabase } from '../../apis/auth/authApi';
import { queryKeys } from '../queryKeys';

const useUserAuthQuery = () => {
  const { user } = useUserAuthStore();

  return useQuery({
    queryKey: queryKeys.user.answers(user?.id ?? ''),
    queryFn: async () => {
      const { data } = await supabase.from('users').select('answers').eq('id', user!.id).single();
      return data;
    },
    enabled: !!user, // 로그인 상태일 때만 실행
  });
};

export default useUserAuthQuery;
