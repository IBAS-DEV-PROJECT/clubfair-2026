import { ActionCategory, ActionDetail } from '../../constants';
import type { User, UserAction } from '../../types/db';

// ===== 타입 정의 =====
export type MyUserSummary = Pick<User, 'id' | 'name' | 'dotori'>;
export type MyActionListItem = Pick<
  UserAction,
  'category' | 'detail' | 'change' | 'created_at'
>;

export interface MyMatchItem {
  partner_instagram_id: string;
  score: number;
}

// ===== Mock 데이터 =====
const MOCK_MY_USER: MyUserSummary = {
  id: 'user_me_001',
  name: '홍길동',
  dotori: 42,
};

const MOCK_MY_ACTIONS: MyActionListItem[] = [
  {
    category: ActionCategory.MISSION,
    detail: ActionDetail.TEST,
    change: 20,
    created_at: '2026-02-12T10:00:00.000Z',
  },
  {
    category: ActionCategory.MISSION,
    detail: ActionDetail.STORY,
    change: 5,
    created_at: '2026-02-13T11:20:00.000Z',
  },
  {
    category: ActionCategory.PURCHASE,
    detail: ActionDetail.EVENT,
    change: -3,
    created_at: '2026-02-13T13:15:00.000Z',
  },
];

const MOCK_MY_MATCHES: MyMatchItem[] = [
  {
    partner_instagram_id: 'clubfair_friend_101',
    score: 97,
  },
];

// ===== API 함수 =====
export async function getMyUser(): Promise<MyUserSummary> {
  return Promise.resolve(MOCK_MY_USER);
}

export async function getMyActions(): Promise<MyActionListItem[]> {
  return Promise.resolve(MOCK_MY_ACTIONS);
}

export async function getMyMatches(): Promise<MyMatchItem[]> {
  return Promise.resolve(MOCK_MY_MATCHES);
}