import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PrimaryButton, AlertModal } from '../../components/shared';
import { Gender } from '../../constants';
import {
  EmailInput,
  InstagramInput,
  PhoneInput,
  PasswordInput,
  NameInput,
  GenderSelector,
  PrivacyConsent,
} from '../../components/features/auth';
import { useSignUpMutation } from '../../hooks/mutations/auth';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SignUpContainer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [instagramId, setInstagramId] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const signupMutation = useSignUpMutation({
    onSuccess: () => {
      navigate('/login');
    },
    onError: (error: Error) => {
      console.error('회원가입 에러 상세:', error);
      // 에러 메시지를 더 자세히 표시
      const errorMsg = error.message || '회원가입이 실패했습니다. 다시 시도해주세요.';
      setErrorMessage(errorMsg);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!privacyConsent) {
      alert('개인정보 처리 방침에 동의해주세요.');
      return;
    }

    // 전화번호 01000000000 형태로 변환
    const fullPhone = `010${phone1}${phone2}`;

    signupMutation.mutate({
      email,
      instagram_id: instagramId,
      phone: fullPhone,
      password,
      name,
      gender,
      privacy_consent: privacyConsent,
    });
  };

  // 입력값 유효성 검사
  const isFormValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    instagramId.length >= 3 &&
    phone1.length === 4 &&
    phone2.length === 4 &&
    password.length === 6 &&
    name.length > 0 &&
    privacyConsent;

  return (
    <StyledForm onSubmit={handleSubmit}>
      {/* 인스타 아이디 입력 */}
      <InstagramInput value={instagramId} onChange={setInstagramId} />

      {/* 전화번호 입력 */}
      <PhoneInput
        phone1={phone1}
        phone2={phone2}
        onPhone1Change={setPhone1}
        onPhone2Change={setPhone2}
      />

      {/* 이메일 입력 */}
      <EmailInput value={email} onChange={setEmail} />

      {/* 비밀번호 입력 */}
      <PasswordInput value={password} onChange={setPassword} />

      {/* 이름 입력 */}
      <NameInput value={name} onChange={setName} />

      {/* 성별 선택 */}
      <GenderSelector value={gender} onChange={setGender} />

      {/* 개인정보 동의 체크 */}
      <PrivacyConsent checked={privacyConsent} onChange={setPrivacyConsent} />
      <PrimaryButton type="submit" disabled={!isFormValid} isPending={signupMutation.isPending}>
        회원가입
      </PrimaryButton>

      {/* 에러 모달 */}
      {errorMessage && (
        <AlertModal message={errorMessage} onClose={() => setErrorMessage(null)} />
      )}
    </StyledForm>
  );
};

export default SignUpContainer;
