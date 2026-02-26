import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PrimaryButton } from '../../components/shared';
import { supabase } from '../../apis/auth/authApi';
import { useLoginMutation } from '../../hooks/mutations/auth';
import { LoginPhoneInput, PasswordInput } from '../../components/features/auth';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LoginContainer = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
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
      alert('로그인에 실패했습니다. 전화번호와 비밀번호를 확인해주세요.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate({
      phone,
      password,
    });
  };

  // 입력값 유효성 검사
  const isFormValid = phone.length === 11 && password.length === 4;

  return (
    <StyledForm onSubmit={handleSubmit}>
      {/* 전화번호 입력 */}
      <LoginPhoneInput value={phone} onChange={setPhone} />

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
