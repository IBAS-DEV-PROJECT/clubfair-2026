import { Button, Hourglass } from 'react95';

// Base Props (공통 부분)
interface BaseButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

// Apply type (도토리 응모하기)
interface ApplyButtonProps extends BaseButtonProps {
  type: 'apply';
  dotori: number;
  requiredDotori?: number;
  isPending?: boolean;
}

// Navigate type (단순 클릭)
interface NavigateButtonProps extends BaseButtonProps {
  type: 'navigate';
}

type PrimaryButtonProps = ApplyButtonProps | NavigateButtonProps;

const PrimaryButton = (props: PrimaryButtonProps) => {
  const { type, children, onClick } = props;

  switch (type) {
    case 'apply': {
      const { dotori, requiredDotori = 5, isPending = false } = props;
      const isDisabled = dotori < requiredDotori || isPending;

      return (
        <Button disabled={isDisabled} onClick={onClick}>
          {isPending ? <Hourglass /> : children}
        </Button>
      );
    }
    case 'navigate': {
      return <Button onClick={onClick}>{children}</Button>;
    }
    default:
      return null;
  }
};

export default PrimaryButton;
