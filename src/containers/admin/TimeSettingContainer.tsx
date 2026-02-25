import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Hourglass } from 'react95';
import { type UpdateClubFairSettingsParams } from '../../apis/admin/adminApi';
import { useClubFairStatus } from '../../hooks/useClubFairStatus';
import { useClubFairSettingsQuery } from '../../hooks/queries/admin/useClubFairSettingsQuery';
import { useUpdateClubFairSettingsMutation } from '../../hooks/mutations/admin/useUpdateClubFairSettingsMutation';
import {
  CurrentStatusBanner,
  DevelopModeToggle,
  TimeSettingCard,
} from '../../components/features/admin';

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px 20px;
`;

const StyledMessage = styled.p`
  margin: 0;
  font-size: 14px;
`;

const TimeSettingContainer = () => {
  // 로컬 개발 환경 체크
  const isLocalDev =
    import.meta.env.MODE === 'development' || window.location.hostname === 'localhost';

  // 로컬 상태 (입력값 관리)
  const [isEditMode, setIsEditMode] = useState(false);
  const [forceDevelopMode, setForceDevelopMode] = useState(false);
  const [preEndTime, setPreEndTime] = useState('');
  const [mainEndTime, setMainEndTime] = useState('');
  const [afterEndTime, setAfterEndTime] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 설정 조회
  const { data: settings, isLoading } = useClubFairSettingsQuery();

  // 설정 업데이트
  const updateMutation = useUpdateClubFairSettingsMutation({
    onSuccess: () => {
      setErrorMessage('');
      setIsEditMode(false);
      alert('설정이 저장되었습니다!');
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  // 현재 상태 계산
  const currentStatus = useClubFairStatus(settings);

  // 설정 로드 시 로컬 상태 초기화
  useEffect(() => {
    if (settings) {
      setForceDevelopMode(settings.forceDevelopMode);
      setPreEndTime(settings.preEndTime);
      setMainEndTime(settings.mainEndTime);
      setAfterEndTime(settings.afterEndTime);
    }
  }, [settings]);

  // 수정 모드 토글 핸들러
  const handleEditToggle = () => {
    if (isEditMode && settings) {
      // 취소 시: 원래 설정값으로 되돌림
      setForceDevelopMode(settings.forceDevelopMode);
      setPreEndTime(settings.preEndTime);
      setMainEndTime(settings.mainEndTime);
      setAfterEndTime(settings.afterEndTime);
      setErrorMessage('');
    }
    setIsEditMode(!isEditMode);
  };

  // 저장 핸들러
  const handleSave = () => {
    const params: UpdateClubFairSettingsParams = {
      forceDevelopMode,
      preEndTime,
      mainEndTime,
      afterEndTime,
    };

    updateMutation.mutate(params);
  };

  // 로딩 중
  if (isLoading) {
    return (
      <CenteredContainer>
        <Hourglass />
        <StyledMessage>설정을 불러오는 중입니다...</StyledMessage>
      </CenteredContainer>
    );
  }

  // 데이터 없음
  if (!settings) {
    return (
      <CenteredContainer>
        <StyledMessage>설정을 불러올 수 없습니다.</StyledMessage>
      </CenteredContainer>
    );
  }

  return (
    <>
      {/* 현재 상태 배너 */}
      <CurrentStatusBanner currentStatus={currentStatus} />

      {/* DEVELOP 모드 토글 */}
      <DevelopModeToggle
        isEnabled={forceDevelopMode}
        isLocalDev={isLocalDev}
        isEditMode={isEditMode}
        onChange={setForceDevelopMode}
      />

      {/* 시간 설정 */}
      <TimeSettingCard
        preEndTime={preEndTime}
        mainEndTime={mainEndTime}
        afterEndTime={afterEndTime}
        isEditMode={isEditMode}
        isDevelopMode={forceDevelopMode}
        onPreEndTimeChange={setPreEndTime}
        onMainEndTimeChange={setMainEndTime}
        onAfterEndTimeChange={setAfterEndTime}
        onEditToggle={handleEditToggle}
        onSave={handleSave}
        isSaving={updateMutation.isPending}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default TimeSettingContainer;
