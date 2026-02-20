import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PrimaryButton } from '../../components/shared';
import { signup } from '../../apis/auth/authApi';
import { Gender } from '../../constants';
import {
  InstagramInput,
  PhoneInput,
  PasswordInput,
  NameInput,
  GenderSelector,
  PrivacyConsent,
} from '../../components/features/auth';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SignUpContainer = () => {
  const navigate = useNavigate();

  // 폼 입력 상태
  const [instagramId, setInstagramId] = useState('');
  const [phone1, setPhone1] = useState(''); // 전화번호 중간 4자리
  const [phone2, setPhone2] = useState(''); // 전화번호 끝 4자리
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [privacyConsent, setPrivacyConsent] = useState(false); // 개인정보 동의 여부

  // 회원가입 mutation
  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
    // 회원가입 성공 시 로그인 페이지로 이동
      navigate('/login');
    },
    onError: (error: any) => {
      console.error(error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!privacyConsent) {
      alert('개인정보 처리 방침에 동의해주세요.');
      return;
    }

    // 전화번호 01000000000 형태로 변환
    const fullPhone = `010${phone1}${phone2}`

    signupMutation.mutate({
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
    instagramId.length >= 3 &&
    phone1.length === 4 &&
    phone2.length === 4 &&
    password.length === 4 &&
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

      {/* 비밀번호 입력 */}
      <PasswordInput value={password} onChange={setPassword} />

      {/* 이름 입력 */}
      <NameInput value={name} onChange={setName} />

      {/* 성별 선택 */}
      <GenderSelector value={gender} onChange={setGender} />

      {/* 개인정보 동의 체크 */}
      <PrivacyConsent checked={privacyConsent} onChange={setPrivacyConsent} />
        <PrimaryButton
            type="submit"
            disabled={!isFormValid}
            isPending={signupMutation.isPending}
            >
            회원가입
        </PrimaryButton>
    </StyledForm>
  );
};

export default SignUpContainer;
