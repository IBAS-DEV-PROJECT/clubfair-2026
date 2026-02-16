import { createGlobalStyle } from 'styled-components';
import { styleReset } from 'react95';
import { colors } from './colors';
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

export const GlobalStyles = createGlobalStyle`
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
    background: ${colors.desktopBackground};
    margin: 0;
    height: 100vh;
  }
  
  .desktop-only {
    display: none;
  }

  @media (min-width: 1024px) {
    .app-content {
      display: none;
    }
    .desktop-only {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 20px;
    }
  }
`;
