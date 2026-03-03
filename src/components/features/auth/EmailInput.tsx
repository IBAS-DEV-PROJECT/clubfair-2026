import { useState } from 'react';
import styled from 'styled-components';
import { TextInput } from 'react95';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  label?: string;
  placeholder?: string;
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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EmailInput = ({
  value,
  onChange,
  id = 'email',
  label = '이메일',
  placeholder = 'example@email.com',
}: EmailInputProps) => {
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    if (email.length === 0) {
      setError('');
      return;
    }
    if (!emailRegex.test(email)) {
      setError('올바른 이메일 형식을 입력해주세요');
      return;
    }
    setError('');
  };

  const handleChange = (newValue: string) => {
    onChange(newValue);
    validateEmail(newValue);
  };

  return (
    <FormField>
      <Label htmlFor={id}>{label}</Label>
      <TextInput
        id={id}
        type="email"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: '100%' }}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormField>
  );
};

export default EmailInput;
