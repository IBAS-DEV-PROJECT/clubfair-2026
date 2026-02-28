import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PrimaryButton, AlertModal } from '../../components/shared';
import { supabase } from '../../apis/auth/authApi';
import { useLoginMutation } from '../../hooks/mutations/auth';
import { EmailInput, PasswordInput } from '../../components/features/auth';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LoginContainer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loginMutation = useLoginMutation({
    onSuccess: async (data) => {
      const userId = data.user?.id;
      if (!userId) {
        navigate('/test');
        return;
      }

      // RPC 함수로 테스트 완료 여부 확인
      const { data: isTestCompleted, error } = await supabase.rpc('is_tester_completed');
      
      if (error) {
        console.error('is_tester_completed RPC 에러:', error);
        navigate('/test');
        return;
      }

      if (isTestCompleted) {
        navigate('/my');
      } else {
        navigate('/test');
      }
    },
    onError: (error: Error) => {
      console.error(error);
      setErrorMessage('로그인이 실패했습니다. 다시 시도해주세요.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate({
      email,
      password,
    });
  };

  // 입력값 유효성 검사
  const isFormValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && password.length === 6;

  return (
    <StyledForm onSubmit={handleSubmit}>
      {/* 이메일 입력 */}
      <EmailInput value={email} onChange={setEmail} />

      {/* 비밀번호 입력 */}
      <PasswordInput value={password} onChange={setPassword} />

      {/* 로그인 버튼 */}
      <PrimaryButton
        type="submit"
        disabled={!isFormValid}
        isPending={loginMutation.isPending}
        fullWidth
      >
        로그인
      </PrimaryButton>

      {/* 에러 모달 */}
      {errorMessage && (
        <AlertModal message={errorMessage} onClose={() => setErrorMessage(null)} />
      )}
    </StyledForm>
  );
};

export default LoginContainer;
