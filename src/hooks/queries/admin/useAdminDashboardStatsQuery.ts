import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../queryKeys';
import { getAdminDashboardStats } from '../../../apis/admin/adminApi';

export function useAdminDashboardStatsQuery() {
  return useQuery({
    queryKey: queryKeys.admin.dashboard(),
    queryFn: getAdminDashboardStats,
  });
}
