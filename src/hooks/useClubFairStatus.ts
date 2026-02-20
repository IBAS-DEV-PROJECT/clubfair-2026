import { useMemo } from 'react';
import { ClubFairStatus } from '../constants';
import type { ClubFairSettings } from '../apis/admin/adminApi';

/**
 * ClubFair 현재 상태를 계산하는 Hook
 *
 * 우선순위:
 * 1. forceDevelopMode → DEVELOP (토글로 제어)
 * 2. 시간 기반 계산 → PRE / MAIN / AFTER / CLOSED
 *
 * 로컬 환경에서도 토글을 끄면 시간 기반 상태 테스트 가능
 */
export const useClubFairStatus = (settings: ClubFairSettings | undefined): ClubFairStatus => {
  return useMemo(() => {
    if (!settings) {
      // 설정이 로딩 중이면 기본값 반환
      return ClubFairStatus.CLOSED;
    }

    // DEVELOP 모드 강제 활성화 체크 (최우선)
    if (settings.forceDevelopMode) {
      return ClubFairStatus.DEVELOP;
    }

    // 시간 기반 상태 계산 (로컬에서도 테스트 가능)
    const now = new Date();
    const preEnd = new Date(settings.preEndTime);
    const mainEnd = new Date(settings.mainEndTime);
    const afterEnd = new Date(settings.afterEndTime);

    if (now < preEnd) {
      return ClubFairStatus.PRE;
    }
    if (now < mainEnd) {
      return ClubFairStatus.MAIN;
    }
    if (now < afterEnd) {
      return ClubFairStatus.AFTER;
    }

    return ClubFairStatus.CLOSED;
  }, [settings]);
};
