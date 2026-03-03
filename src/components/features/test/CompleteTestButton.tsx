import { Button, Hourglass } from 'react95';

interface CompleteTestbuttonProps {
  onClick: () => void;
  isPending?: boolean;
  disabled?: boolean;
}

const CompleteTestbutton = ({ onClick, isPending = false, disabled = false }: CompleteTestbuttonProps) => {
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

export default CompleteTestbutton;