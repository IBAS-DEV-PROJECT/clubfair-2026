import styled from 'styled-components';
import { Window, WindowHeader, WindowContent } from 'react95';
import { colors } from '../../styles/colors';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: ${colors.desktopBackground};
`;

const DesktopBlocker = () => {
  return (
    <Wrapper>
      <Window style={{ width: '90%', maxWidth: '400px' }}>
        <WindowHeader>
          <span>System Message</span>
        </WindowHeader>
        <WindowContent>
          <p style={{ marginBottom: '1rem' }}>
            이 서비스는 모바일 및 태블릿 환경에 최적화되어 있습니다.
          </p>
          <p>
            더 나은 경험을 위해 모바일 기기로 접속해 주세요!
          </p>
        </WindowContent>
      </Window>
    </Wrapper>
  );
};

export default DesktopBlocker;

