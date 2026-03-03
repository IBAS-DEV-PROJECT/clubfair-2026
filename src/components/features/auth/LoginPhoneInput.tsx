import { useState } from 'react';
import styled from 'styled-components';
import { TextInput } from 'react95';

interface LoginPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledLabel = styled.label`
  font-weight: bold;
  font-size: 14px;
`;

const StyledErrorMessage = styled.p`
  color: #c00;
  font-size: 12px;
  margin: 0;
  margin-top: -4px;
`;

const LoginPhoneInput = ({ value, onChange }: LoginPhoneInputProps) => {
  const [error, setError] = useState('');

  const validatePhone = (phone: string) => {
    if (phone.length === 0) {
      setError('');
      return;
    }
    // 전화번호 11자리 미입력 시
    if (phone.length !== 11) {
      setError('전화번호 11자리를 입력해주세요');
      return;
    }
    // 전화번호 형식이 틀렸을 시 (010-)
    if (!/^010\d{8}$/.test(phone)) {
      setError('010으로 시작하는 11자리 숫자를 입력해주세요');
      return;
    }
    setError('');
  };

  const handleChange = (newValue: string) => {
    if (/^\d{0,11}$/.test(newValue)) {
      onChange(newValue);
      validatePhone(newValue);
    }
  };

  return (
    <FormField>
      <StyledLabel htmlFor="phone">전화번호</StyledLabel>
      <TextInput
        id="phone"
        type="tel"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="01012345678"
        maxLength={11}
        style={{ width: '200px' }}
      />
      {error && <StyledErrorMessage>{error}</StyledErrorMessage>}
    </FormField>
  );
};

export default LoginPhoneInput;
