import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import original from 'react95/dist/themes/original';
import { GlobalStyles } from './styles/globalTheme';
import { breakpoints } from './styles/breakpoints';
import DesktopBlocker from './components/shared/DesktopBlocker';

const App = () => {
  const isDesktop = useMediaQuery({ query: `(min-width: ${breakpoints.laptop})` });

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={original}>
        {isDesktop ? (
          <DesktopBlocker />
        ) : (
          <Router>
            <Routes>
              <Route path="/" element={<div>Home Page (Mobile/Tablet Only)</div>} />
            </Routes>
          </Router>
        )}
      </ThemeProvider>
    </>
  );
};

export default App;
