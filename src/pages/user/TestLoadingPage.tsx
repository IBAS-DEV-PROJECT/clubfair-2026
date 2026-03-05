import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Window, WindowHeader, WindowContent, ProgressBar } from 'react95';

const Wrapper = styled.div`
  min-height: calc(100vh - 88px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
`;

const ContentWindow = styled(Window)`
  width: 90%;
  max-width: 500px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin: 0;
  color: #000080;
`;

const Message = styled.p`
  font-size: 14px;
  line-height: 1.6;
  text-align: center;
  margin: 0;
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  margin-top: 8px;
`;

const TestLoadingPage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

useEffect(() => {
  const duration = 3000;

  // 100ms마다 업데이트 → 총 30번만 렌더링
  const interval = setInterval(() => {
    setProgress((prev) => Math.min(prev + 100 / 30, 100));
  }, 100);

  const redirectTimer = setTimeout(() => {
    navigate('/my', { replace: true });
  }, duration);

  return () => {
    clearInterval(interval);
    clearTimeout(redirectTimer);
  };
}, [navigate]);

  return (
    <Wrapper>
      <ContentWindow>
        <WindowHeader>결과 분석 중...</WindowHeader>
        <WindowContent>
          <ContentWrapper>
            <Title>테스트 결과를 분석하고 있습니다</Title>
            <Message>
              잠시만 기다려주세요
              <br />곧 결과 페이지로 이동합니다
            </Message>
            <ProgressBarWrapper>
              <ProgressBar value={Math.floor(progress)} />
            </ProgressBarWrapper>
          </ContentWrapper>
        </WindowContent>
      </ContentWindow>
    </Wrapper>
  );
};

export default TestLoadingPage;
