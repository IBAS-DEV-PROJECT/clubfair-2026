/**
 * ==========================================
 * DB Schema Types (DB 스키마 타입)
 * ==========================================
 */

import type { Gender, ActionCategory, ActionDetail, ClubFairStatus } from '../constants';

export interface User {
  id: string;
  phone: string;
  name: string;
  instagram_id: string;
  gender: Gender;

  answers: number[];

  dotori: number;
  selected_count: number;
  created_at: string;
}

export interface UserAction {
  id: number;
  user_id: string;
  category: ActionCategory;
  detail: ActionDetail;
  change: number;
  created_at: string;
}

export interface Match {
  id: number;
  visitor_id: string;
  partner_id: string;
  score: number;
  created_at: string;
}

export interface ClubFairSetting {
  id: number;
  start_at: string;
  end_at: string;
  status: ClubFairStatus;
  is_paused: boolean;
}
