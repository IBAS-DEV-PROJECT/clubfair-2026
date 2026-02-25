import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  grantDotoriToUser,
  GrantDotoriParams,
  GrantDotoriResponse,
} from '../../../apis/admin/adminApi';
import { queryKeys } from '../../queryKeys';

interface UseGrantDotoriMutationOptions {
  onSuccess?: (data: GrantDotoriResponse) => void;
  onError?: (error: Error) => void;
}

export function useGrantDotoriMutation(options?: UseGrantDotoriMutationOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: GrantDotoriParams) => grantDotoriToUser(params),
    onSuccess: (data) => {
      // 유저 검색 결과 캐시 무효화 (도토리 개수 업데이트 반영)
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.userSearch({ phoneLast4: '' }) });
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });
}
