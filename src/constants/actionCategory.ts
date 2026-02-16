export type ActionCategory = 'MISSION' | 'PURCHASE';

export const ActionCategory = {
  MISSION: 'MISSION',
  PURCHASE: 'PURCHASE',
} as const;

export const ActionCategoryLabel: Record<ActionCategory, string> = {
  MISSION: '획득',
  PURCHASE: '차감',
};
