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
      // 테스트 완료 상태 쿼리 무효화
      if (user?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.user.isTestCompleted(user.id) });
      }
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}
