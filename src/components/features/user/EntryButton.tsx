import { Button, Hourglass } from 'react95';

interface EntryButtonProps {
  dotori: number;
  onClick: () => void;
  requiredDotori?: number;
  isPending?: boolean;
}

const EntryButton = ({
  dotori,
  onClick,
  requiredDotori = 5,
  isPending = false,
}: EntryButtonProps) => {
  const isDisabled = dotori < requiredDotori || isPending;

  return (
    <Button disabled={isDisabled} onClick={onClick}>
      {isPending ? <Hourglass /> : '응모하기'}
    </Button>
  );
};

export default EntryButton;
