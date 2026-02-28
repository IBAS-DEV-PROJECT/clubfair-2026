export type ActionDetail = 'TEST' | 'FOLLOW' | 'STORY' | 'GAME1' | 'GAME2' | 'GAME3' | 'EVENT';

export const ActionDetail = {
  // Mission
  TEST: 'TEST',
  FOLLOW: 'FOLLOW',
  STORY: 'STORY',
  GAME1: 'GAME1',
  GAME2: 'GAME2',
  GAME3: 'GAME3',
  // Purchase
  EVENT: 'EVENT',
} as const;

export const ActionDetailLabel: Record<ActionDetail, string> = {
  TEST: '테스트 완료',
  FOLLOW: '인스타 팔로우',
  STORY: '스토리 인증',
  GAME1: '게임 1',
  GAME2: '게임 2',
  GAME3: '게임 3',
  EVENT: '이벤트 응모',
};
