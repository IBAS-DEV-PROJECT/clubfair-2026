import { FunctionsHttpError } from '@supabase/supabase-js';
import { AdminRole } from '../../constants';
import { supabase } from '../../libs/supabase';

// ===== 타입 정의 =====
export interface ClubFairSettings {
  status?: string; // DEVELOP | PRE | MAIN | AFTER | CLOSED
  forceDevelopMode?: boolean;
  preEndTime?: string;
  mainEndTime?: string;
  afterEndTime?: string;
}

export interface UpdateClubFairSettingsParams {
  status?: string;
  forceDevelopMode?: boolean;
  preEndTime?: string;
  mainEndTime?: string;
  afterEndTime?: string;
}

export interface ClubFairSettingsResponse {
  settings: ClubFairSettings;
  currentStatus: string; // DEVELOP | PRE | MAIN | AFTER | CLOSED
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
  email: string;
  dotori: number;
  canGiveFollow: boolean;
  canGiveStory: boolean;
}

export type GrantDotoriReason = 'FOLLOW' | 'STORY' | 'GAME1' | 'GAME2' | 'GAME3';

export interface GrantDotoriParams {
  user_id: string;
  reason: GrantDotoriReason;
}

export interface GrantDotoriResponse {
  user_id: string;
  dotori: number;
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

export interface EventDrawInfo {
  drawResult: DrawEventResponse | null;
}

// ===== API 함수 =====
export async function verifyAdminPin(
  params: VerifyAdminPinParams,
): Promise<VerifyAdminPinResponse> {
  const { data, error } = await supabase.functions.invoke('admin-auth', {
    body: { pin: params.pin },
  });

  if (error) {
    throw new Error(error.message ?? 'PIN이 일치하지 않습니다.');
  }

  const result = data as { success?: boolean; role?: string; error?: string } | null;
  if (
    result?.success &&
    (result.role === AdminRole.ADMIN || result.role === AdminRole.SUPER_ADMIN)
  ) {
    return { success: true, role: result.role as VerifyAdminPinResponse['role'] };
  }

  throw new Error(result?.error ?? 'PIN이 일치하지 않습니다.');
}

export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
  const { data, error } = await supabase.functions.invoke('get-admin-stats');

  if (error) {
    throw new Error(error.message ?? '통계를 불러오지 못했습니다.');
  }

  const result = data as {
    todayVisitors?: number;
    totalVisitors?: number;
    genderRatio?: { male?: number; female?: number };
    testRate?: number;
    gameRate?: number;
    eventRate?: number;
    error?: string;
  } | null;

  if (!result || result.error) {
    throw new Error(result?.error ?? '통계 데이터를 찾을 수 없습니다.');
  }

  return {
    visitors_today: result.todayVisitors ?? 0,
    visitors_total: result.totalVisitors ?? 0,
    male_ratio: result.genderRatio?.male ?? 0,
    female_ratio: result.genderRatio?.female ?? 0,
    test_participation_rate: result.testRate ?? 0,
    game_participation_rate: result.gameRate ?? 0,
    event_entry_rate: result.eventRate ?? 0,
  };
}

export async function searchUsersByPhoneLast4(
  params: SearchUsersByPhoneLast4Params,
): Promise<AdminUserSearchItem[]> {
  if (!/^\d{4}$/.test(params.phone_last4)) {
    throw new Error('전화번호 뒷자리는 숫자 4자리여야 합니다.');
  }

  const { data, error } = await supabase.functions.invoke('search-users-by-phone', {
    body: { lastFourDigits: params.phone_last4 },
  });

  if (error) {
    throw new Error(error.message ?? '유저 검색에 실패했습니다.');
  }

  const result = data as { users?: AdminUserSearchItem[]; error?: string } | null;
  if (!result || result.error) {
    throw new Error(result?.error ?? '검색 결과를 불러오지 못했습니다.');
  }

  return result.users ?? [];
}

export async function grantDotoriToUser(params: GrantDotoriParams): Promise<GrantDotoriResponse> {
  const { data, error } = await supabase.functions.invoke('give-dotori', {
    body: {
      userId: params.user_id,
      detail: params.reason,
    },
  });

  if (error) {
    let message = '알 수 없는 에러가 발생했습니다.';
    try {
      if (error instanceof FunctionsHttpError && error.context) {
        const errorData = (await error.context.json()) as { error?: string };
        message = errorData?.error ?? error.message ?? '도토리 지급에 실패했습니다.';
      } else {
        message = error.message ?? '도토리 지급에 실패했습니다.';
      }
    } catch {
      message = error.message ?? '도토리 지급에 실패했습니다.';
    }
    throw new Error(message);
  }

  const result = data as {
    user_id?: string;
    dotori?: number;
    error?: string;
  } | null;

  if (!result || result.error || !result.user_id || result.dotori == null) {
    throw new Error(result?.error ?? '도토리 지급 결과를 불러오지 못했습니다.');
  }

  return {
    user_id: result.user_id,
    dotori: result.dotori,
  };
}

export async function getClubFairSettings(): Promise<ClubFairSettings> {
  const { data, error } = await supabase.functions.invoke('get-fair-settings');

  if (error) {
    throw new Error(error.message ?? '설정 정보를 불러오지 못했습니다.');
  }

  const result = data as {
    settings?: Record<string, unknown>;
    currentStatus?: string;
    error?: string;
  } | null;
  if (!result || result.error || !result.settings) {
    throw new Error(result?.error ?? '설정 정보를 찾을 수 없습니다.');
  }

  const s = result.settings as Record<string, unknown>;
  return {
    status: String(result.currentStatus ?? s?.status ?? 'CLOSED'),
    forceDevelopMode: !!s?.force_develop_mode,
    preEndTime: s?.pre_end_time != null ? String(s.pre_end_time) : '',
    mainEndTime: s?.main_end_time != null ? String(s.main_end_time) : '',
    afterEndTime: s?.after_end_time != null ? String(s.after_end_time) : '',
  };
}

export async function updateClubFairSettings(
  params: UpdateClubFairSettingsParams,
): Promise<ClubFairSettings> {
  const current = await getClubFairSettings();

  const body: {
    status?: string;
    force_develop_mode?: boolean;
    pre_end_time?: string;
    main_end_time?: string;
    after_end_time?: string;
  } = {};

  if (params.status != null) body.status = params.status;
  if (params.forceDevelopMode != null) body.force_develop_mode = params.forceDevelopMode;
  if (params.preEndTime != null) body.pre_end_time = params.preEndTime;
  if (params.mainEndTime != null) body.main_end_time = params.mainEndTime;
  if (params.afterEndTime != null) body.after_end_time = params.afterEndTime;

  if (params.forceDevelopMode != null && !params.forceDevelopMode && current.status === 'DEVELOP') {
    body.status = 'PRE';
  }

  const pre = body.pre_end_time ?? current.preEndTime;
  const main = body.main_end_time ?? current.mainEndTime;
  const after = body.after_end_time ?? current.afterEndTime;
  if (pre && main && after) {
    const p = new Date(pre);
    const m = new Date(main);
    const a = new Date(after);
    if (p >= m || m >= a) {
      throw new Error('구간 순서는 PRE 종료 < MAIN 종료 < AFTER 종료 이어야 합니다.');
    }
  }

  const { data, error } = await supabase.functions.invoke('update-fair-settings', {
    body,
  });

  if (error) {
    throw new Error(error.message ?? '설정 정보를 저장하지 못했습니다.');
  }

  const result = data as { success?: boolean; error?: string } | null;
  if (result?.error) {
    throw new Error(result.error);
  }

  // 저장 후 서버 상태 재조회
  return getClubFairSettings();
}

// 이벤트 추첨 실행 (Edge Function 호출)
export async function drawEvent(): Promise<DrawEventResponse> {
  const { data, error } = await supabase.functions.invoke('draw-event-winners');

  if (error) {
    throw new Error(error.message ?? '이벤트 추첨에 실패했습니다.');
  }

  const result = data as (DrawEventResponse & { error?: string }) | null;
  if (!result || result.error) {
    throw new Error(result?.error ?? '이벤트 추첨 결과를 불러오지 못했습니다.');
  }

  return {
    draw_id: result.draw_id,
    drawn_at: result.drawn_at,
    prizes: result.prizes,
  };
}

// 기존 추첨 결과 조회
export async function getEventDrawInfo(): Promise<EventDrawInfo> {
  const { data, error } = await supabase.functions.invoke('get-event-draw-info');

  if (error) {
    throw new Error(error.message ?? '이벤트 추첨 정보를 불러오지 못했습니다.');
  }

  const result = data as {
    drawResult?: DrawEventResponse | null;
    error?: string;
  } | null;

  if (!result || result.error) {
    throw new Error(result?.error ?? '이벤트 추첨 정보를 찾을 수 없습니다.');
  }

  return {
    drawResult: result.drawResult ?? null,
  };
}
