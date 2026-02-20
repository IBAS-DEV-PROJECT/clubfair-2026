import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import original from 'react95/dist/themes/original';
import { GlobalStyles } from './styles/globalTheme';
import { breakpoints } from './styles/breakpoints';
import {
  LandingPage,
  SignUpPage,
  LoginPage,
  TestPage,
  MyPage,
  AdminPage,
  AdminSettingPage,
} from './pages';
import { Footer, Header, ProtectedAdminLayout } from './layouts';
import { AdminRole } from './constants';
import DesktopBlocker from './components/shared/DesktopBlocker';
import ProtectedUserLayout from './layouts/ProtectedUserLayout';

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
            <Routes>
              {/* User 페이지 */}
              <Route element={<ProtectedUserLayout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* 로그인만 필요 */}
                <Route element={<ProtectedUserLayout requiredTest={false} />}>
                  <Route path="/test" element={<TestPage />} />
                </Route>

                {/* 로그인 + 테스트 완료 필요 */}
                <Route element={<ProtectedUserLayout />}>
                  <Route path="/my" element={<MyPage />} />
                </Route>
              </Route>

              {/* Admin 페이지 - PIN 인증 필요 */}
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
