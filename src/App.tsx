import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import original from 'react95/dist/themes/original';
import { GlobalStyles } from './styles/globalTheme';
import { breakpoints } from './styles/breakpoints';
import { Footer, Header } from './layouts';
import DesktopBlocker from './components/shared/DesktopBlocker';
import { UserRoutes, AdminRoutes } from './routes';

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
            <Header />
            <UserRoutes />
            <AdminRoutes />
            <Footer />
          </Router>
        )}
      </ThemeProvider>
    </>
  );
};

export default App;
