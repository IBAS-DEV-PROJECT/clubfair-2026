import { useState } from 'react';
import styled from 'styled-components';
import { TextInput } from 'react95';

interface PhoneInputProps {
  phone1: string;
  phone2: string;
  onPhone1Change: (value: string) => void;
  onPhone2Change: (value: string) => void;
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

const PhoneInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PhonePrefix = styled.span`
  font-weight: bold;
`;

const ErrorMessage = styled.p`
  color: #c00;
  font-size: 12px;
  margin: 0;
  margin-top: -4px;
`;

const PhoneInput = ({ phone1, phone2, onPhone1Change, onPhone2Change }: PhoneInputProps) => {
  const [error, setError] = useState('');

  const validatePhone = (p1: string, p2: string) => {
    if ((p1.length > 0 || p2.length > 0) && (p1.length !== 4 || p2.length !== 4)) {
      setError('전화번호 형식이 맞지 않아요');
      return;
    }
    setError('');
  };

  const handlePhone1Change = (value: string) => {
    if (/^\d{0,4}$/.test(value)) {
      onPhone1Change(value);
      validatePhone(value, phone2);
    }
  };

  const handlePhone2Change = (value: string) => {
    if (/^\d{0,4}$/.test(value)) {
      onPhone2Change(value);
      validatePhone(phone1, value);
    }
  };

  return (
    <FormField>
      <Label>전화번호</Label>
      <PhoneInputGroup>
        <PhonePrefix>010</PhonePrefix>
        <span>-</span>
        <TextInput
          value={phone1}
          onChange={(e) => handlePhone1Change(e.target.value)}
          placeholder="1234"
          maxLength={4}
          style={{ width: '80px' }}
        />
        <span>-</span>
        <TextInput
          value={phone2}
          onChange={(e) => handlePhone2Change(e.target.value)}
          placeholder="5678"
          maxLength={4}
          style={{ width: '80px' }}
        />
      </PhoneInputGroup>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormField>
  );
};

export default PhoneInput;
