import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import original from 'react95/dist/themes/original';
import { GlobalStyles } from './styles/globalTheme';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={original}>
        <Router>
          <Routes>
            <Route path="/" element={<div>Home Page</div>} />
            {/* 추후 페이지 컴포넌트들을 여기에 추가하세요 */}
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
