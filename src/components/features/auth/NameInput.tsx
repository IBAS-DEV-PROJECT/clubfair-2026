import { useState } from 'react';
import styled from 'styled-components';
import { TextInput } from 'react95';

interface NameInputProps {
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

const NameInput = ({ value, onChange }: NameInputProps) => {
  const [error, setError] = useState('');

  const validateName = (n: string) => {
    if (n.length === 0) {
      setError('');
      return;
    }
    if (n.length > 30) {
      setError('30자 이내로 입력해주세요');
      return;
    }
    const nameRegex = /^[가-힣a-zA-Z\s]+$/;
    if (!nameRegex.test(n)) {
      setError('한글 또는 영문만 입력해주세요');
      return;
    }
    setError('');
  };

  const handleChange = (newValue: string) => {
    onChange(newValue);
    validateName(newValue);
  };

  return (
    <FormField>
      <Label htmlFor="name">이름</Label>
      <TextInput
        id="name"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="홍길동"
        maxLength={30}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormField>
  );
};

export default NameInput;
