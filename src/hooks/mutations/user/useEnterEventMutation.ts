import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enterEvent } from '../../../apis/user/userApi';
import { queryKeys } from '../../queryKeys';
import { useUserAuthStore } from '../../../stores/useUserAuthStore';

interface UseEnterEventMutationOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useEnterEventMutation(options?: UseEnterEventMutationOptions) {
  const queryClient = useQueryClient();
  const user = useUserAuthStore((state) => state.user);

  return useMutation({
    mutationFn: enterEvent,
    onSuccess: () => {
      // 도토리 관련 쿼리 무효화
      if (user?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.user.myResult(user.id) });
      }
      options?.onSuccess?.();
    },
    onError: options?.onError,
  });
}
