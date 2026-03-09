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
  GAME1: '"투데이(Today)를 잡아라!" ',
  GAME2: '노래 3초 듣고 맞히기',
  GAME3: '10초 이상형 스피드 답변',
  EVENT: '이벤트 응모',
};