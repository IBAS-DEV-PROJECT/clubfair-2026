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
  SettingPage,
} from './pages';
import { Footer, Header } from './layouts';
import DesktopBlocker from './components/shared/DesktopBlocker';
import { useUserAuthStore } from './stores/useUserAuthStore';
import { useEffect } from 'react';

const App = () => {
  const isDesktop = useMediaQuery({ query: `(min-width: ${breakpoints.laptop})` });
  // 로컬 스토리지에서 로그인 세션 읽어오기 (user, isAuthenticated)
  const init = useUserAuthStore((state) => state.init);

  useEffect(()=> {
    init();
  }, []);

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={original}>
        {/* 1024px 이상부터 차단 */}
        {isDesktop ? (
          <DesktopBlocker />
        ) : (
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="/my" element={<MyPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/setting" element={<SettingPage />} />
            </Routes>
            <Footer />
          </Router>
        )}
      </ThemeProvider>
    </>
  );
};

export default App;
