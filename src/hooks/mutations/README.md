# Mutations Hook 가이드

## 왜 필요한가
- 생성/수정/삭제/로그인 같은 변경 요청을 일관되게 처리하기 위해 사용한다.
- 성공/실패 후처리(`invalidateQueries`, 토스트, 이동)를 한곳에서 관리할 수 있다.
- 컴포넌트마다 `try/catch` 로직을 반복하지 않아도 된다.

## 이 폴더에서 만드는 것
- 위치: `src/hooks/mutations/{domain}/useXxxMutation.ts`
- 네이밍: `useXxxMutation`
- 규칙:
  - `mutationFn`은 `src/apis/*Api.ts` 함수만 사용한다.
  - 성공 시 관련 Query Key를 `invalidateQueries`로 갱신한다.
  - `isPending`, `isError` 상태를 UI에 전달한다.

## 기본 템플릿
```ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { grantDotoriToUser } from '../../../apis/admin/adminApi';
import { queryKeys } from '../../queryKeys';

export function useGrantDotoriMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: grantDotoriToUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.dashboard() });
    },
  });
}
```

## 컴포넌트에서 사용
```tsx
const grantDotoriMutation = useGrantDotoriMutation();

const onClickGrant = () => {
  grantDotoriMutation.mutate({ user_id: 'user_001', amount: 3 });
};
```

## 도메인 분업 시 원칙
- 도메인 담당자가 Mutation Hook까지 같이 관리한다.
- 어떤 Query를 invalidate할지 훅 코드에서 의도가 드러나게 작성한다.
- 공통 정책(에러 메시지, 토큰 처리)이 바뀌면 문서를 먼저 수정한 뒤 코드 반영한다.

