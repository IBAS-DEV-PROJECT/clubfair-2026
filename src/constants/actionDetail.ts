export type ActionDetail = 'TEST' | 'FLLOW' | 'STORY' | 'GAME' | 'EVENT';

export const ActionDetail = {
  // Mission
  TEST: 'TEST',
  FLLOW: 'FLLOW',
  STORY: 'STORY',
  GAME: 'GAME',
  // Purchase
  EVENT: 'EVENT',
} as const;

