import { Button, TextInput } from 'react95';
import styled from 'styled-components';
import { colors } from '../../../styles/colors';
import { useRef, useState } from 'react';

interface UserSearchFormProps {
  onSearch: (phoneLast4: string) => void;
  isSearching: boolean;
  isGranting: boolean;
}

const SearchSection = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
`;

const InputGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: bold;
  color: ${colors.canvasText};
`;

const UserSearchForm = ({ onSearch, isSearching, isGranting }: UserSearchFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isValid, setIsValid] = useState(false);

  const handleInput = () => {
    const value = inputRef.current?.value ?? '';
    const normalized = value.replace(/\D/g, '').slice(0, 4);

    if (inputRef.current && value !== normalized) {
      inputRef.current.value = normalized;
    }

    setIsValid(normalized.length === 4 && /^\d{4}$/.test(normalized));
  };

  const handleSearchClick = () => {
    const value = inputRef.current?.value ?? '';
    const normalized = value.replace(/\D/g, '').slice(0, 4);

    if (!normalized || normalized.length !== 4 || !/^\d{4}$/.test(normalized)) {
      return;
    }

    onSearch(normalized);
  };

  const isSearchButtonDisabled = !isValid || isSearching || isGranting;

  return (
    <SearchSection>
      <InputGroup>
        <Label htmlFor="phoneLast4">전화번호 뒷자리 (4자리)</Label>
        <TextInput
          ref={inputRef}
          id="phoneLast4"
          onInput={handleInput}
          placeholder="1234"
          maxLength={4}
          disabled={isSearching || isGranting}
          fullWidth
        />
      </InputGroup>
      <Button onClick={handleSearchClick} disabled={isSearchButtonDisabled}>
        검색
      </Button>
    </SearchSection>
  );
};

export default UserSearchForm;
