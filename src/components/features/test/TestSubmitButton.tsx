import { Button, Hourglass } from 'react95';

interface TestSubmitButtonProps {
  onClick: () => void;
  isPending?: boolean;
  disabled?: boolean;
}

const TestSubmitButton = ({ onClick, isPending = false, disabled = false }: TestSubmitButtonProps) => {
  return (
    <Button
      fullWidth
      disabled={disabled || isPending}
      onClick={onClick}
    >
      {isPending ? <Hourglass /> : '제출하기'}
    </Button>
  );
};

export default TestSubmitButton;