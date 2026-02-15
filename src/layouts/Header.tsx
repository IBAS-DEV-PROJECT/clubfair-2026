import { AppBar } from 'react95';
import styled from 'styled-components';

const StyledAppBar = styled(AppBar)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const HeaderText = styled.p`
  margin: 0;
  padding: 6px 12px;
  font-weight: 600;
`;

const Header = () => {
  return (
    <StyledAppBar>
      <HeaderText>CLUB_FAIR_2026</HeaderText>
    </StyledAppBar>
  );
};

export default Header;
