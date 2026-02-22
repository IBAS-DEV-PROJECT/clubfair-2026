import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { verifyAdminPin } from '../../apis/admin/adminApi';
import { useAdminStore } from '../../stores/useAdminStore';
import PinAuthForm from '../../components/features/admin/PinAuthForm';

interface PinAuthContainerProps {
  title?: string;
  onSuccess?: () => void;
}

const PinAuthContainer = ({ title = 'Admin 인증', onSuccess }: PinAuthContainerProps) => {
  const [pin, setPin] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const setRole = useAdminStore((state) => state.setRole);

  const verifyMutation = useMutation({
    mutationFn: verifyAdminPin,
    onSuccess: (data) => {
      setRole(data.role);
      onSuccess?.();
    },
    onError: (error: Error) => {
      setErrorMessage(error.message);
      setPin('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!pin) {
      setErrorMessage('PIN을 입력해 주세요.');
      return;
    }

    verifyMutation.mutate({ pin });
  };

  return (
    <PinAuthForm
      title={title}
      pin={pin}
      errorMessage={errorMessage}
      isPending={verifyMutation.isPending}
      onPinChange={setPin}
      onSubmit={handleSubmit}
    />
  );
};

export default PinAuthContainer;
