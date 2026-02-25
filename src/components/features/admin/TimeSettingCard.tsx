import styled from 'styled-components';
import { Button, TextInput } from 'react95';
import { colors } from '../../../styles/colors';
import { toDateTimeLocalValue } from '../../../utils/date';

interface TimeSettingCardProps {
  preEndTime: string;
  mainEndTime: string;
  afterEndTime: string;
  isEditMode: boolean;
  isDevelopMode: boolean; // DEVELOP 모드 여부
  onPreEndTimeChange: (value: string) => void;
  onMainEndTimeChange: (value: string) => void;
  onAfterEndTimeChange: (value: string) => void;
  onEditToggle: () => void;
  onSave: () => void;
  isSaving?: boolean;
  errorMessage?: string;
}

const Container = styled.div`
  padding: 16px;
  border: 2px solid ${colors.borderDark};
  background: ${colors.canvas};
`;

const StyledTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 14px;
  font-weight: bold;
`;

const InputGroup = styled.div`
  margin-bottom: 12px;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 4px;
  font-size: 12px;
  font-weight: bold;
`;

const ErrorMessage = styled.p`
  margin: 8px 0;
  color: ${colors.error};
  font-size: 12px;
`;

const ButtonWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 8px;
`;

const TimeSettingCard = ({
  preEndTime,
  mainEndTime,
  afterEndTime,
  isEditMode,
  isDevelopMode,
  onPreEndTimeChange,
  onMainEndTimeChange,
  onAfterEndTimeChange,
  onEditToggle,
  onSave,
  isSaving = false,
  errorMessage,
}: TimeSettingCardProps) => {
  const timeSettings = [
    {
      id: 'preEndTime',
      label: '사전 테스트 종료 (동아리 박람회 시작)',
      value: preEndTime,
      onChange: onPreEndTimeChange,
    },
    {
      id: 'mainEndTime',
      label: '동아리 박람회 종료 (이벤트 추첨 시작)',
      value: mainEndTime,
      onChange: onMainEndTimeChange,
    },
    {
      id: 'afterEndTime',
      label: '이벤트 추첨 종료 (동아리 박람회 종료)',
      value: afterEndTime,
      onChange: onAfterEndTimeChange,
    },
  ];

  return (
    <Container>
      <StyledTitle>TIME SETTING</StyledTitle>

      {timeSettings.map(({ id, label, value, onChange }) => (
        <InputGroup key={id}>
          <StyledLabel htmlFor={id}>{label}</StyledLabel>
          <TextInput
            id={id}
            type="datetime-local"
            value={toDateTimeLocalValue(value)}
            onChange={(e) => onChange(e.target.value)}
            disabled={!isEditMode || isSaving || isDevelopMode}
            fullWidth
          />
        </InputGroup>
      ))}

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      {isDevelopMode && isEditMode && (
        <ErrorMessage>
          DEVELOP 모드에서는 시간 설정을 수정할 수 없습니다.
          <br /> 먼저 DEVELOP 모드를 꺼주세요.
        </ErrorMessage>
      )}

      <ButtonWrapper>
        {!isEditMode ? (
          <Button onClick={onEditToggle} style={{ flex: 1 }}>
            수정하기
          </Button>
        ) : (
          <>
            <Button onClick={onSave} disabled={isSaving || isDevelopMode} style={{ flex: 1 }}>
              {isSaving ? '저장 중...' : '저장'}
            </Button>
            <Button onClick={onEditToggle} disabled={isSaving} style={{ flex: 1 }}>
              취소
            </Button>
          </>
        )}
      </ButtonWrapper>
    </Container>
  );
};

export default TimeSettingCard;
