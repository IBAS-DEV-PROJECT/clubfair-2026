import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { styleReset } from 'react95';
// @ts-ignore
import original from 'react95/dist/themes/original';
// @ts-ignore
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
// @ts-ignore
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

const GlobalStyles = createGlobalStyle`
  ${styleReset}
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
    font-family: 'ms_sans_serif';
    background: #008080;
  }
`;

const App = () => (
  <>
    <GlobalStyles />
    <ThemeProvider theme={original}>
      <div style={{ padding: '2rem', color: 'white' }}>
        <h1>Club Fair 2026</h1>
        <p>프로젝트 세팅이 완료되었습니다. 이곳에 코드를 작성하세요.</p>
      </div>
    </ThemeProvider>
  </>
);

export default App;
