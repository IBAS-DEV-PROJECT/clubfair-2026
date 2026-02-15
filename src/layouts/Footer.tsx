import styled from 'styled-components';
import { colors } from '../styles/colors';

const FooterWrapper = styled.footer`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  padding: 8px;
  background: ${colors.material};
  border-top: 2px solid ${colors.borderLightest};
  box-shadow: inset 0 -1px 0 ${colors.borderDarkest};
`;

const FooterText = styled.p`
  margin: 0;
  padding: 4px;
  text-align: center;
  font-size: 12px;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterText>Copyright 2026 IBAS. All rights reserved.</FooterText>
      <FooterText>Developed by IBAS Dev.</FooterText>
    </FooterWrapper>
  );
};

export default Footer;
