export type ClubFairStatus = 'PRE' | 'MAIN' | 'AFTER' | 'CLOSED';

export const ClubFairStatus = {
  PRE: 'PRE', // 사전 기간
  MAIN: 'MAIN', // 박람회 기간
  AFTER: 'AFTER', // 결과 조회 기간
  CLOSED: 'CLOSED', // 종료
} as const;
