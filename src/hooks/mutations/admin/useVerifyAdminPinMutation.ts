import { useMutation } from '@tanstack/react-query';
import {
  verifyAdminPin,
  type VerifyAdminPinParams,
  type VerifyAdminPinResponse,
} from '../../../apis/admin/adminApi';

interface UseVerifyAdminPinMutationOptions {
  onSuccess?: (data: VerifyAdminPinResponse) => void;
  onError?: (error: Error) => void;
}

export function useVerifyAdminPinMutation(options?: UseVerifyAdminPinMutationOptions) {
  return useMutation({
    mutationFn: (params: VerifyAdminPinParams) => verifyAdminPin(params),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}
