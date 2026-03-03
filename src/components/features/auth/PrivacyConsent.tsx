import styled from 'styled-components';
import { Checkbox } from 'react95';
import { colors } from '../../../styles/colors';

interface PrivacyConsentProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ConsentGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background-color: ${colors.canvas};
  border: 2px solid ${colors.borderMedium};
`;

const ConsentText = styled.p`
  font-size: 12px;
  color: ${colors.textMuted};
  margin: 0;
  line-height: 1.5;
`;

const PrivacyConsent = ({ checked, onChange }: PrivacyConsentProps) => {
  return (
    <ConsentGroup>
      <Checkbox
        checked={checked}
        onChange={() => onChange(!checked)}
        label="개인정보 처리 방침 동의"
      />
      <ConsentText>
        동아리 박람회에서 수집된 정보는 박람회 이후 파기됩니다.
        <br />
        수집된 개인정보는 매칭 서비스 제공 목적으로만 사용되며, 제3자에게 제공되지 않습니다.
      </ConsentText>
    </ConsentGroup>
  );
};

export default PrivacyConsent;
