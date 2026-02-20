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
                  <Route path="/mypage" element={<MyPage />} />
                </Route>
                
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/setting" element={<SettingPage />} />
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