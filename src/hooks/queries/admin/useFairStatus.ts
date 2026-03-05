import { useClubFairSettingsQuery } from './useClubFairSettingsQuery';
import { ClubFairStatus } from '../../../constants';

export const useFairStatus = () => {
  const queryResult = useClubFairSettingsQuery();

  const rawStatus = queryResult.data?.status;
  const status =
    rawStatus && Object.values(ClubFairStatus).includes(rawStatus as ClubFairStatus)
      ? (rawStatus as ClubFairStatus)
      : ClubFairStatus.CLOSED;

  return {
    ...queryResult,
    status,
  };
};
