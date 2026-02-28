import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PrimaryButton } from '../../components/shared';
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

  const loginMutation = useLoginMutation({
    onSuccess: async (data) => {
      const userId = data.user?.id;
      if (!userId) {
        navigate('/test');
        return;
      }

      const { data: userData } = await supabase
        .from('users')
        .select('answers')
        .eq('id', userId)
        .single();

      const hasCompletedTest = (userData?.answers?.length ?? 0) > 0;
      if (hasCompletedTest) {
        navigate('/my');
      } else {
        navigate('/test');
      }
    },
    onError: (error: Error) => {
      console.error(error);
      alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
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
    </StyledForm>
  );
};

export default LoginContainer;
