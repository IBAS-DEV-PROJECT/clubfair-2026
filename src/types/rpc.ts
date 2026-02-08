import type { ActionCategory, ActionDetail } from '../constants';

/**
 * RPC Function Parameters
 */

export interface HandleDotoriParams {
  p_user_id: string;
  p_category: ActionCategory;
  p_detail: ActionDetail;
  p_change: number;
}

