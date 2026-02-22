import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import original from 'react95/dist/themes/original';
import { GlobalStyles } from './styles/globalTheme';
import { breakpoints } from './styles/breakpoints';
import {
  AdminPage,
  AdminSettingPage,
} from './pages';
import { Footer, Header, ProtectedAdminLayout } from './layouts';
import { AdminRole } from './constants';
import DesktopBlocker from './components/shared/DesktopBlocker';
import UserRoutes from './routes/UserRoutes';

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
            {/* Admin - 추후 AdminRoutes.ts로 분리 예정 */}
            <Routes>
              <Route element={<ProtectedAdminLayout requiredRole={AdminRole.ADMIN} />}>
                <Route path="/admin" element={<AdminPage />} />
              </Route>
              <Route element={<ProtectedAdminLayout requiredRole={AdminRole.SUPER_ADMIN} />}>
                <Route path="/admin/setting" element={<AdminSettingPage />} />
              </Route>
            </Routes>
            <Footer />
          </Router>
        )}
      </ThemeProvider>
    </>
  );
};

export default App;
