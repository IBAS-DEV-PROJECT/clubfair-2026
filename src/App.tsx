import { createGlobalStyle, ThemeProvider } from 'styled-components';
import {
  styleReset,
  Window,
  WindowHeader,
  WindowContent,
  TextInput,
  Button,
  GroupBox,
  Checkbox
} from 'react95';
// @ts-ignore
import original from 'react95/dist/themes/original';
// @ts-ignore
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
// @ts-ignore
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'RoundedFixedsys';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/DungGeunMo.woff') format('woff');
    font-weight: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal;
  }
  body {
    font-family: 'ms_sans_serif', 'RoundedFixedsys';
    background: #008080;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;

const App = () => (
  <>
    <GlobalStyles />
    <ThemeProvider theme={original}>
      <Window style={{ width: 350 }}>
        <WindowHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>Login.exe (로그인)</span>
          <Button>
            <span style={{ fontWeight: 'bold', transform: 'translateY(-1px)' }}>x</span>
          </Button>
        </WindowHeader>
        <WindowContent>
          <GroupBox label="Login Information (로그인 정보)">
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ marginBottom: '0.5rem' }}>Username (사용자 이름):</p>
              <TextInput placeholder="Enter username..." fullWidth />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ marginBottom: '0.5rem' }}>Password (비밀번호):</p>
              <TextInput type="password" placeholder="Enter password..." fullWidth />
            </div>
            <Checkbox label="Remember me (로그인 상태 유지)" checked={false} onChange={() => {}} />
          </GroupBox>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <Button style={{ marginRight: '0.5rem' }}>Cancel (취소)</Button>
            <Button primary>Login (로그인)</Button>
          </div>
        </WindowContent>
      </Window>
    </ThemeProvider>
  </>
);

export default App;
