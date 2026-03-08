import { useState } from 'react';
import styled from 'styled-components';
import { TextInput } from 'react95';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
}

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 14px;
`;

const ErrorMessage = styled.p`
  color: #c00;
  font-size: 12px;
  margin: 0;
  margin-top: -4px;
`;

const PasswordInput = ({ value, onChange }: PasswordInputProps) => {
  const [error, setError] = useState('');

  const validatePassword = (pwd: string) => {
    if (pwd.length === 0) {
      setError('');
      return;
    }
    if (pwd.length !== 6) {
      setError('6자리 숫자를 입력해주세요');
      return;
    }
    if (!/^\d{6}$/.test(pwd)) {
      setError('숫자만 입력해주세요');
      return;
    }
    setError('');
  };

  const handleChange = (newValue: string) => {
    if (/^\d{0,6}$/.test(newValue)) {
      onChange(newValue);
      validatePassword(newValue);
    }
  };

  return (
    <FormField>
      <Label htmlFor="password">비밀번호</Label>
      <TextInput
        id="password"
        type="password"
        autoComplete="new-password"  // 크롬이 비밀번호 필드임을 인식해 비밀번호 유출 경고 안 뜨도록
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="6자리 숫자"
        maxLength={6}
        style={{ width: '120px' }}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormField>
  );
};

export default PasswordInput;
