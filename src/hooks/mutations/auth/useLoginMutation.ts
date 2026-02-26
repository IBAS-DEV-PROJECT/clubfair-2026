import { useMutation } from '@tanstack/react-query';
import { login } from '../../../apis/auth/authApi';

export type LoginMutationData = Awaited<ReturnType<typeof login>>;

interface UseLoginMutationOptions {
  onSuccess?: (data: LoginMutationData) => void | Promise<void>;
  onError?: (error: Error) => void;
}

export function useLoginMutation(options?: UseLoginMutationOptions) {
  return useMutation({
    mutationFn: login,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}
