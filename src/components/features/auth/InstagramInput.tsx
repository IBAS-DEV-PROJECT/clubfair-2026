import { useState } from 'react';
import styled from 'styled-components';
import { TextInput } from 'react95';

interface InstagramInputProps {
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

const InstagramInput = ({ value, onChange }: InstagramInputProps) => {
  const [error, setError] = useState('');

  const validateInstagramId = (id: string) => {
    if (id.length === 0) {
      setError('');
      return;
    }
    if (id.length < 3 || id.length > 30) {
      setError('3~30자까지 입력해주세요');
      return;
    }
    const instagramRegex = /^[a-zA-Z0-9._]+$/;
    if (!instagramRegex.test(id)) {
      setError('인스타 아이디 형식이 맞지 않아요');
      return;
    }
    setError('');
  };

  const handleChange = (newValue: string) => {
    onChange(newValue);
    validateInstagramId(newValue);
  };

  return (
    <FormField>
      <Label htmlFor="instagram">인스타 아이디</Label>
      <TextInput
        id="instagram"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="example_id"
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormField>
  );
};

export default InstagramInput;
