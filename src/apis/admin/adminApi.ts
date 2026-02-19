import { ActionCategory, ActionDetail, AdminRole } from '../../constants';
import type { UserAction } from '../../types/db';

// ===== 타입 정의 =====
export interface VerifyAdminPinParams {
  pin: string;
}

export interface VerifyAdminPinResponse {
  success: boolean;
  role: AdminRole;
}

export interface AdminDashboardStats {
  visitors_today: number;
  visitors_total: number;
  male_ratio: number;
  female_ratio: number;
  test_participation_rate: number;
  game_participation_rate: number;
  event_entry_rate: number;
}

export interface SearchUsersByPhoneLast4Params {
  phone_last4: string;
}

export interface AdminUserSearchItem {
  user_id: string;
  name: string;
  phone_last4: string;
  dotori: number;
}

export interface GrantDotoriParams {
  user_id: string;
  amount: number;
}

export interface GrantDotoriResponse {
  user_id: string;
  dotori: number;
  action: Pick<UserAction, 'category' | 'detail' | 'change' | 'created_at'>;
}

// ===== Mock 데이터 =====
const MOCK_ADMIN_PIN = '1234'; // /admin PIN
const MOCK_SUPER_ADMIN_PIN = '5678'; // /admin/setting PIN

const MOCK_ADMIN_DASHBOARD_STATS: AdminDashboardStats = {
  visitors_today: 123,
  visitors_total: 400,
  male_ratio: 53,
  female_ratio: 47,
  test_participation_rate: 68,
  game_participation_rate: 42,
  event_entry_rate: 32,
};

const MOCK_ADMIN_USERS: AdminUserSearchItem[] = [
  {
    user_id: 'user_001',
    name: '김철수',
    phone_last4: '9243',
    dotori: 3,
  },
  {
    user_id: 'user_002',
    name: '홍길동',
    phone_last4: '1111',
    dotori: 42,
  },
];

// ===== API 함수 =====
export async function verifyAdminPin(
  params: VerifyAdminPinParams,
): Promise<VerifyAdminPinResponse> {
  // ADMIN PIN 확인
  if (params.pin === MOCK_ADMIN_PIN) {
    return Promise.resolve({
      success: true,
      role: AdminRole.ADMIN,
    });
  }

  // SUPER_ADMIN PIN 확인
  if (params.pin === MOCK_SUPER_ADMIN_PIN) {
    return Promise.resolve({
      success: true,
      role: AdminRole.SUPER_ADMIN,
    });
  }

  // PIN 불일치
  throw new Error('PIN이 일치하지 않습니다.');
}

export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
  return Promise.resolve(MOCK_ADMIN_DASHBOARD_STATS);
}

export async function searchUsersByPhoneLast4(
  params: SearchUsersByPhoneLast4Params,
): Promise<AdminUserSearchItem[]> {
  if (!/^\d{4}$/.test(params.phone_last4)) {
    throw new Error('전화번호 뒷자리는 숫자 4자리여야 합니다.');
  }

  return Promise.resolve(
    MOCK_ADMIN_USERS.filter((user) => user.phone_last4 === params.phone_last4),
  );
}

export async function grantDotoriToUser(params: GrantDotoriParams): Promise<GrantDotoriResponse> {
  if (params.amount <= 0) {
    throw new Error('지급 도토리는 1개 이상이어야 합니다.');
  }

  const targetUser = MOCK_ADMIN_USERS.find((user) => user.user_id === params.user_id);
  if (!targetUser) {
    throw new Error('대상 유저를 찾을 수 없습니다.');
  }

  targetUser.dotori += params.amount;

  return Promise.resolve({
    user_id: targetUser.user_id,
    dotori: targetUser.dotori,
    action: {
      category: ActionCategory.PURCHASE,
      detail: ActionDetail.EVENT,
      change: params.amount,
      created_at: new Date().toISOString(),
    },
  });
}
