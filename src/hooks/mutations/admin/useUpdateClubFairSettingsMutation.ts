import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateClubFairSettings } from '../../../apis/admin/adminApi';
import { queryKeys } from '../../queryKeys';

interface UseUpdateClubFairSettingsMutationOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

/**
 * ClubFair 설정 업데이트 Mutation
 * - forceDevelopMode, preEndTime, mainEndTime, afterEndTime 수정
 * - 성공 시 캐시 자동 업데이트
 */
export function useUpdateClubFairSettingsMutation(
  options?: UseUpdateClubFairSettingsMutationOptions,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateClubFairSettings,
    onSuccess: (updatedSettings) => {
      // 캐시 업데이트
      queryClient.setQueryData(queryKeys.admin.clubfairSettings(), updatedSettings);
      options?.onSuccess?.();
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });
}
