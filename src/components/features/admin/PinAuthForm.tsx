import { TextInput } from 'react95';
import styled from 'styled-components';
import PrimaryButton from '../../shared/PrimaryButton';
import { colors } from '../../../styles/colors';

interface PinAuthFormProps {
  title: string;
  pin: string;
  errorMessage: string;
  isPending: boolean;
  onPinChange: (pin: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
  margin: 0 auto;
`;

const StyledTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const StyledErrorMessage = styled.p`
  margin: 0;
  color: ${colors.error};
  font-size: 12px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

const PinAuthForm = ({
  title,
  pin,
  errorMessage,
  isPending,
  onPinChange,
  onSubmit,
}: PinAuthFormProps) => {
  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledTitle>{title}</StyledTitle>
      <div>
        <label htmlFor="pin">PIN 입력:</label>
        <TextInput
          id="pin"
          type="password"
          value={pin}
          onChange={(e) => onPinChange(e.target.value)}
          placeholder="4자리 PIN"
          maxLength={4}
          disabled={isPending}
          fullWidth
        />
      </div>

      {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}

      <ButtonGroup>
        <PrimaryButton type="submit" isPending={isPending} loadingText="확인 중..." fullWidth>
          확인
        </PrimaryButton>
      </ButtonGroup>
    </StyledForm>
  );
};

export default PinAuthForm;
