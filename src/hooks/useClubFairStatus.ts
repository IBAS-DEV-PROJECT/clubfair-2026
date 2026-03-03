import { useMemo } from 'react';
import { ClubFairStatus } from '../constants';
import type { ClubFairSettings } from '../apis/admin/adminApi';

export const useClubFairStatus = (settings: ClubFairSettings | undefined): ClubFairStatus => {
  return useMemo(() => {
    if (
      !settings?.status ||
      !Object.values(ClubFairStatus).includes(settings.status as ClubFairStatus)
    ) {
      return ClubFairStatus.CLOSED;
    }

    return settings.status as ClubFairStatus;
  }, [settings?.status]);
};
