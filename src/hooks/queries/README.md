# Queries Hook 가이드

## 왜 필요한가
- 조회(GET) API의 캐싱/재요청/로딩/에러 처리를 화면마다 중복하지 않기 위해 사용한다.
- 컴포넌트는 UI에 집중하고, 서버 상태 로직은 훅으로 분리한다.
- 같은 `queryKey`를 사용하면 화면 간 데이터가 일관되게 공유된다.

## 이 폴더에서 만드는 것
- 위치: `src/hooks/queries/{domain}/useXxxQuery.ts`
- 네이밍: `useXxxQuery`
- 규칙:
  - `queryKey`는 반드시 `src/hooks/queryKeys.ts`를 사용한다.
  - `queryFn`은 `src/apis/*Api.ts`의 함수만 호출한다.
  - 훅에서 반환되는 상태(`data`, `isFetching`, `isError`)를 UI에서 사용한다.

## 기본 템플릿
```ts
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../queryKeys';
import { getAdminDashboardStats } from '../../../apis/admin/adminApi';

export function useAdminDashboardStatsQuery() {
  return useQuery({
    queryKey: queryKeys.admin.dashboard(),
    queryFn: getAdminDashboardStats,
  });
}
```

## 컴포넌트에서 사용
```tsx
const { data, isFetching, isError } = useAdminDashboardStatsQuery();

if (isFetching) return <div>로딩중...</div>;
if (isError) return <div>에러가 발생했습니다.</div>;
return <div>오늘 방문자: {data?.visitors_today}</div>;
```

## 도메인 분업 시 원칙
- 도메인 담당자가 해당 도메인의 UI + Query Hook + API를 함께 관리한다.
- 공통 파일(`src/hooks/queryKeys.ts`, 공통 타입, 컨벤션 문서) 변경은 사전에 공유한다.
- Query Key 문자열 하드코딩은 금지한다.

