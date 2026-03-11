import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitTestAnswers } from '../../../apis/test/testApi';
import type { TestResult } from '../../../types/testResult';
import { queryKeys } from '../../queryKeys';
import { useUserAuthStore } from '../../../stores/useUserAuthStore';

interface UseSubmitTestMutationOptions {
  onSuccess?: (data: TestResult) => void;
  onError?: (error: Error) => void;
}

export function useSubmitTestMutation(options?: UseSubmitTestMutationOptions) {
  const queryClient = useQueryClient();
  const user = useUserAuthStore((state) => state.user);

  return useMutation({
    mutationFn: submitTestAnswers,
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.user.userResult(), data);
      if (user?.id) {
        queryClient.setQueryData(queryKeys.user.myResult(user.id), data);
        // 제출 직후이므로 캐시에 true 설정 (invalidate 시 refetch가 false 덮어쓸 수 있음)
        queryClient.setQueryData(queryKeys.user.isTestCompleted(user.id), true);
      }
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}
