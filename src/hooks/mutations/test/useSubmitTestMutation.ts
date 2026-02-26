import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitTestAnswers, type SubmitTestAnswersResponse } from '../../../apis/test/testApi';
import { queryKeys } from '../../queryKeys';

interface UseSubmitTestMutationOptions {
  onSuccess?: (data: SubmitTestAnswersResponse) => void;
  onError?: (error: Error) => void;
}

export function useSubmitTestMutation(options?: UseSubmitTestMutationOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitTestAnswers,
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.user.userResult(), data);
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}
