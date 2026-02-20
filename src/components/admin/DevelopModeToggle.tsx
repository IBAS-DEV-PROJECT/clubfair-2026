import styled from 'styled-components';
import { colors } from '../../styles/colors';

interface DevelopModeToggleProps {
  isEnabled: boolean;
  isLocalDev: boolean;
  isEditMode: boolean;
  onChange: (checked: boolean) => void;
}

const Container = styled.div`
  padding: 16px;
  border: 2px solid ${colors.borderDark};
  background: ${colors.canvas};
`;

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

const ToggleLabel = styled.span`
  font-size: 13px;
  font-weight: bold;
`;

const ToggleSwitch = styled.button<{ $isOn: boolean; $disabled: boolean }>`
  position: relative;
  width: 60px;
  height: 28px;
  background: ${({ $isOn }) => ($isOn ? colors.headerBackground : colors.material)};
  border: 2px solid ${colors.borderDarkest};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  box-shadow:
    inset -1px -1px 0 ${colors.borderLightest},
    inset 1px 1px 0 ${colors.borderDark};

  &:active:not(:disabled) {
    box-shadow:
      inset 1px 1px 0 ${colors.borderDark},
      inset -1px -1px 0 ${colors.borderLightest};
  }
`;

const ToggleThumb = styled.div<{ $isOn: boolean }>`
  position: absolute;
  top: 2px;
  left: ${({ $isOn }) => ($isOn ? 'calc(100% - 22px)' : '2px')};
  width: 18px;
  height: 18px;
  background: ${colors.canvas};
  border: 1px solid ${colors.borderDarkest};
  box-shadow:
    inset -1px -1px 0 ${colors.borderDark},
    inset 1px 1px 0 ${colors.borderLightest};
  transition: left 0.2s ease;
`;

const ToggleText = styled.span<{ $isOn: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 10px;
  font-weight: bold;
  color: ${({ $isOn }) => ($isOn ? colors.canvasTextInvert : colors.canvasText)};
  left: ${({ $isOn }) => ($isOn ? '6px' : 'auto')};
  right: ${({ $isOn }) => ($isOn ? 'auto' : '6px')};
`;

const StyledNotice = styled.p`
  margin: 8px 0 0 0;
  font-size: 12px;
  color: ${colors.textMuted};
`;

const WarningNotice = styled(StyledNotice)`
  color: ${colors.error};
  font-weight: bold;
`;

const DevelopModeToggle = ({
  isEnabled,
  isLocalDev,
  isEditMode,
  onChange,
}: DevelopModeToggleProps) => {
  const handleToggle = () => {
    if (isEditMode) {
      onChange(!isEnabled);
    }
  };

  return (
    <Container>
      <ToggleWrapper>
        <ToggleLabel>DEVELOP MODE</ToggleLabel>
        <ToggleSwitch
          type="button"
          $isOn={isEnabled}
          $disabled={!isEditMode}
          onClick={handleToggle}
          disabled={!isEditMode}
        >
          <ToggleText $isOn={isEnabled}>{isEnabled ? 'ON' : 'OFF'}</ToggleText>
          <ToggleThumb $isOn={isEnabled} />
        </ToggleSwitch>
      </ToggleWrapper>

      {isLocalDev && (
        <StyledNotice>
          로컬 환경입니다. <br />
          토글을 끄면 시간 기반 상태를 테스트할 수 있습니다.
        </StyledNotice>
      )}

      {!isLocalDev && isEnabled && (
        <WarningNotice>
          DEVELOP 모드가 활성화되어 있습니다.
          <br /> 프로덕션에서는 비활성화해 주세요.
        </WarningNotice>
      )}
    </Container>
  );
};

export default DevelopModeToggle;
