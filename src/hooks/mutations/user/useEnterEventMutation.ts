import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enterEvent } from '../../../apis/user/userApi';
import { queryKeys } from '../../queryKeys';

interface UseEnterEventMutationOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useEnterEventMutation(options?: UseEnterEventMutationOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => enterEvent({ cost: 5 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.userResult() });
      options?.onSuccess?.();
    },
    onError: options?.onError,
  });
}
