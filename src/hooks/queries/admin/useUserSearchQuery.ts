import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../queryKeys';
import {
  searchUsersByPhoneLast4,
  SearchUsersByPhoneLast4Params,
} from '../../../apis/admin/adminApi';

export function useUserSearchQuery(
  params: SearchUsersByPhoneLast4Params,
  enabled: boolean = false,
) {
  return useQuery({
    queryKey: queryKeys.admin.userSearch({ phoneLast4: params.phone_last4 }),
    queryFn: () => searchUsersByPhoneLast4(params),
    enabled: enabled && params.phone_last4.length === 4 && /^\d{4}$/.test(params.phone_last4),
  });
}
