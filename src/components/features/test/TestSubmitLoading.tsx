import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ProgressBar } from 'react95';

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 40px 20px;
  min-height: 200px;
`;

const LoadingText = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #000080;
`;

const TestSubmitLoading = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3000;
    const intervalMs = 300;
    const step = 100 / (duration / intervalMs);

    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + step, 100));
    }, intervalMs);

    const timer = setTimeout(() => {
      navigate('/my', { replace: true });
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <LoadingWrapper>
      <LoadingText>제출 중...</LoadingText>
      <ProgressBar value={progress} hideValue style={{ width: '100%' }} />
    </LoadingWrapper>
  );
};

export default TestSubmitLoading;
