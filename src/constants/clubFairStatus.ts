export type ClubFairStatus = 'DEVELOP' | 'PRE' | 'MAIN' | 'AFTER' | 'CLOSED';

export const ClubFairStatus = {
  DEVELOP: 'DEVELOP', // 개발 모드 (모든 페이지 접근 가능)
  PRE: 'PRE', // 사전 기간
  MAIN: 'MAIN', // 박람회 기간
  AFTER: 'AFTER', // 결과 조회 기간
  CLOSED: 'CLOSED', // 종료
} as const;
