import styled from 'styled-components';
import { Radio } from 'react95';

interface AnswerRadioProps {
  name: string;
  value: number;
  checked: boolean;
  label: string;
  text: string;
  onChange: (value: number) => void;
}

const RadioWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const RadioContent = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledLabel = styled.span`
  font-weight: bold;
`;

const AnswerRadio = ({ name, value, checked, label, text, onChange }: AnswerRadioProps) => {
  return (
    <RadioWrapper onClick={() => onChange(value)}>
      <Radio
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
      />
      <RadioContent>
        <StyledLabel>{label}.</StyledLabel>
        <span>{text}</span>
      </RadioContent>
    </RadioWrapper>
  );
};

export default AnswerRadio;
