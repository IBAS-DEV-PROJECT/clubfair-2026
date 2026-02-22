import styled from 'styled-components';
import { Radio } from 'react95';
import { Gender } from '../../../constants';

interface GenderSelectorProps {
  value: Gender;
  onChange: (value: Gender) => void;
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

const GenderGroup = styled.div`
  display: flex;
  gap: 16px;
`;

const GenderSelector = ({ value, onChange }: GenderSelectorProps) => {
  return (
    <FormField>
      <Label>성별</Label>
      <GenderGroup>
        <Radio
          checked={value === Gender.MALE}
          onChange={() => onChange(Gender.MALE)}
          label="남성"
          name="gender"
          value="male"
        />
        <Radio
          checked={value === Gender.FEMALE}
          onChange={() => onChange(Gender.FEMALE)}
          label="여성"
          name="gender"
          value="female"
        />
      </GenderGroup>
    </FormField>
  );
};

export default GenderSelector;
