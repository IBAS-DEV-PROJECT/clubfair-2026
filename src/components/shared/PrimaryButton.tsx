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

// Submit type (form 제출)
interface SubmitButtonProps extends Omit<BaseButtonProps, 'onClick'> {
  type: 'submit';
  isPending?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  loadingText?: string;
}

type PrimaryButtonProps = ApplyButtonProps | NavigateButtonProps | SubmitButtonProps;

const PrimaryButton = (props: PrimaryButtonProps) => {
  const { type, children } = props;

  switch (type) {
    case 'apply': {
      const { onClick, dotori, requiredDotori = 5, isPending = false } = props;
      const isDisabled = dotori < requiredDotori || isPending;

      return (
        <Button disabled={isDisabled} onClick={onClick}>
          {isPending ? <Hourglass /> : children}
        </Button>
      );
    }
    case 'navigate': {
      const { onClick } = props;
      return <Button onClick={onClick}>{children}</Button>;
    }
    case 'submit': {
      const {
        isPending = false,
        disabled = false,
        fullWidth = false,
        loadingText = '처리 중...',
      } = props;

      return (
        <Button type="submit" 
          disabled={disabled || isPending} 
          {...(fullWidth && { fullWidth: true })}  // true일 때만 전달
        >
          {isPending ? loadingText : children}
        </Button>
      );
    }
    default:
      return null;
  }
};

export default PrimaryButton;
