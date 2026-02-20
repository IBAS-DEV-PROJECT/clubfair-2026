/**
 * queryKeys 추가 가이드
 *
 * 1) 도메인 객체를 먼저 찾는다. (없으면 새 도메인을 추가)
 * 2) 리소스별 key 함수를 만든다.
 * 3) 파라미터가 있으면 마지막 요소에 객체로 넣는다.
 * 4) 반환 배열에는 반드시 `as const`를 붙인다.
 *
 * 예시)
 * profile: {
 *   detail: (params: { userId: string }) =>
 *     ['profile', 'detail', { userId: params.userId }] as const,
 * }
 *
 * 사용 예시)
 * useQuery({ queryKey: queryKeys.admin.dashboard(), queryFn: getAdminDashboardStats })
 * queryClient.invalidateQueries({ queryKey: queryKeys.admin.dashboard() })
 */

export const queryKeys = {
  auth: {
    session: () => ['auth', 'session'] as const,
  },
  user: {
    myUser: () => ['user', 'myUser'] as const,
    myActions: () => ['user', 'myActions'] as const,
    myMatches: () => ['user', 'myMatches'] as const,
    answers: (userId: string) => ['user', 'answers', { userId }] as const,
  },
  test: {
    result: (params: { answers: number[] }) =>
      ['test', 'result', { answers: params.answers }] as const,
  },
  admin: {
    dashboard: () => ['admin', 'dashboard'] as const,
    userSearch: (params: { phoneLast4: string }) =>
      ['admin', 'userSearch', { phoneLast4: params.phoneLast4 }] as const,
    clubfairSettings: () => ['admin', 'clubfair-settings'] as const,
  },
};
