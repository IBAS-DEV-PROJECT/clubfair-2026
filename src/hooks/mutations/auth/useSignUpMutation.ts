import { useMutation } from '@tanstack/react-query';
import { signup } from '../../../apis/auth/authApi';

export type SignUpMutationData = Awaited<ReturnType<typeof signup>>;

interface UseSignUpMutationOptions {
  onSuccess?: (data: SignUpMutationData) => void;
  onError?: (error: Error) => void;
}

export function useSignUpMutation(options?: UseSignUpMutationOptions) {
  return useMutation({
    mutationFn: signup,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}
