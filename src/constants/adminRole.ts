export type AdminRole = 'ADMIN' | 'SUPER_ADMIN';

export const AdminRole = {
  ADMIN: 'ADMIN', // /admin 접근 (통계, 유저 검색, 도토리 지급)
  SUPER_ADMIN: 'SUPER_ADMIN', // /admin/setting 접근 (시간 세팅, 이벤트 추첨)
} as const;
