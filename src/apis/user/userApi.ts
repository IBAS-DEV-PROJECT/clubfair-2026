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

export interface EnterEventParams {
  cost?: number;
}

export interface EnterEventResponse {
  dotori: number;
  action: MyActionListItem;
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
    change: 2,
    created_at: '2026-02-12T10:00:00.000Z',
  },
  {
    category: ActionCategory.MISSION,
    detail: ActionDetail.STORY,
    change: 1,
    created_at: '2026-02-13T11:20:00.000Z',
  },
  {
    category: ActionCategory.PURCHASE,
    detail: ActionDetail.EVENT,
    change: -5,
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

export async function enterEvent(params: EnterEventParams = {}): Promise<EnterEventResponse> {
  const cost = params.cost ?? 5;

  if (cost <= 0) {
    throw new Error('응모 비용은 1 이상이어야 합니다.');
  }

  if (MOCK_MY_USER.dotori < cost) {
    throw new Error('도토리가 부족합니다.');
  }

  MOCK_MY_USER.dotori -= cost;

  const action: MyActionListItem = {
    category: ActionCategory.PURCHASE,
    detail: ActionDetail.EVENT,
    change: -cost,
    created_at: new Date().toISOString(),
  };

  MOCK_MY_ACTIONS.unshift(action);

  return Promise.resolve({
    dotori: MOCK_MY_USER.dotori,
    action,
  });
}