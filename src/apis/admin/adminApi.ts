import { ActionCategory, ActionDetail, AdminRole } from '../../constants';
import type { UserAction } from '../../types/db';

// ===== 타입 정의 =====
export interface ClubFairSettings {
  forceDevelopMode: boolean;
  preEndTime: string;
  mainEndTime: string;
  afterEndTime: string;
}

export interface UpdateClubFairSettingsParams {
  forceDevelopMode?: boolean;
  preEndTime?: string;
  mainEndTime?: string;
  afterEndTime?: string;
}

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

export interface EventDrawUser {
  user_id: string;
  name: string;
  phone: string; // 전화번호 (예: 01012345678)
}

export interface EventPrizeWinner {
  rank: number; // 1, 2, 3
  prize_name: string; // "치킨", "베라 파인트", "메가 아아"
  winners: EventDrawUser[];
}

export interface DrawEventResponse {
  draw_id: string;
  drawn_at: string;
  prizes: EventPrizeWinner[];
}

// ===== Mock 데이터 =====
const MOCK_ADMIN_PIN = '1234'; // /admin PIN
const MOCK_SUPER_ADMIN_PIN = '5678'; // /admin/setting PIN

let MOCK_CLUBFAIR_SETTINGS: ClubFairSettings = {
  forceDevelopMode: true, // 개발 환경 초기값: true
  preEndTime: '2026-03-01T18:00:00+09:00', // PRE 종료 = MAIN 시작
  mainEndTime: '2026-03-02T18:00:00+09:00', // MAIN 종료 = AFTER 시작
  afterEndTime: '2026-03-10T23:59:00+09:00', // AFTER 종료 = CLOSED
};

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

// 추첨 가능한 유저 목록 (응모한 사람들)
const MOCK_DRAWABLE_USERS: EventDrawUser[] = [
  { user_id: 'user_001', name: '김철수', phone: '01012341234' },
  { user_id: 'user_002', name: '이영희', phone: '01023452345' },
  { user_id: 'user_003', name: '박민수', phone: '01034563456' },
  { user_id: 'user_004', name: '최지은', phone: '01045674567' },
  { user_id: 'user_005', name: '정다은', phone: '01056785678' },
  { user_id: 'user_006', name: '강태현', phone: '01067896789' },
  { user_id: 'user_007', name: '윤서아', phone: '01078907890' },
  { user_id: 'user_008', name: '임준호', phone: '01089018901' },
  { user_id: 'user_009', name: '한예린', phone: '01090129012' },
  { user_id: 'user_010', name: '송민지', phone: '01011223344' },
];

// 추첨 결과 저장용
let MOCK_DRAW_RESULT: DrawEventResponse | null = null;

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

export async function getClubFairSettings(): Promise<ClubFairSettings> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...MOCK_CLUBFAIR_SETTINGS });
    }, 300);
  });
}

export async function updateClubFairSettings(
  params: UpdateClubFairSettingsParams,
): Promise<ClubFairSettings> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const preEnd = params.preEndTime
        ? new Date(params.preEndTime)
        : new Date(MOCK_CLUBFAIR_SETTINGS.preEndTime);
      const mainEnd = params.mainEndTime
        ? new Date(params.mainEndTime)
        : new Date(MOCK_CLUBFAIR_SETTINGS.mainEndTime);
      const afterEnd = params.afterEndTime
        ? new Date(params.afterEndTime)
        : new Date(MOCK_CLUBFAIR_SETTINGS.afterEndTime);

      if (preEnd >= mainEnd || mainEnd >= afterEnd) {
        reject(new Error('시간 순서가 올바르지 않습니다. (PRE < MAIN < AFTER)'));
        return;
      }

      // 설정 업데이트
      MOCK_CLUBFAIR_SETTINGS = {
        ...MOCK_CLUBFAIR_SETTINGS,
        ...params,
      };

      resolve({ ...MOCK_CLUBFAIR_SETTINGS });
    }, 500);
  });
}

// 추첨 가능한 유저 리스트 조회
export async function getDrawableUsers(): Promise<EventDrawUser[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...MOCK_DRAWABLE_USERS]);
    }, 300);
  });
}

// 이벤트 추첨 실행
export async function drawEvent(): Promise<DrawEventResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 추첨 대상이 7명 이상인지 확인
      if (MOCK_DRAWABLE_USERS.length < 7) {
        reject(new Error('추첨 대상이 최소 7명 이상이어야 합니다.'));
        return;
      }

      // 랜덤 추첨
      const shuffled = [...MOCK_DRAWABLE_USERS];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      // 1등 1명, 2등 2명, 3등 4명
      const first = shuffled.slice(0, 1);
      const second = shuffled.slice(1, 3);
      const third = shuffled.slice(3, 7);

      const result: DrawEventResponse = {
        draw_id: `draw_${Date.now()}`,
        drawn_at: new Date().toISOString(),
        prizes: [
          { rank: 1, prize_name: '치킨', winners: first },
          { rank: 2, prize_name: '배스킨라빈스 파인트', winners: second },
          { rank: 3, prize_name: '메가커피 아이스 아메리카노', winners: third },
        ],
      };

      // 결과 저장
      MOCK_DRAW_RESULT = result;

      resolve(result);
    }, 800);
  });
}

// 추첨 결과 조회
export async function getDrawResult(): Promise<DrawEventResponse | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_DRAW_RESULT);
    }, 300);
  });
}
