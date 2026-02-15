export type ActionDetail = 'TEST' | 'FOLLOW' | 'STORY' | 'GAME' | 'EVENT'; // GAME_1, GAME_2, GAME_3 추가 예정

export const ActionDetail = {
  // Mission
  TEST: 'TEST',
  FOLLOW: 'FOLLOW',
  STORY: 'STORY',
  GAME: 'GAME', // GAME_1, GAME_2, GAME_3 추가 예정
  // Purchase
  EVENT: 'EVENT',
} as const;

export const ActionDetailLabel: Record<ActionDetail, string> = {
  TEST: '테스트 완료',
  FOLLOW: '인스타 팔로우',
  STORY: '스토리 인증',
  GAME: 'GAME_1', // GAME_1, GAME_2, GAME_3으로 세분화 예정
  EVENT: '이벤트 응모',
};
