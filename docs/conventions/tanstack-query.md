# TanStack Query 컨벤션

## 1. 목표와 범위
- 목표: 서버 상태 로직을 일관된 방식으로 관리한다.
- 범위: `src/apis`, `src/hooks/queries`, `src/hooks/mutations`.
- 원칙: API 함수와 React 훅의 책임을 분리한다.

## 2. 책임 분리
### API 레이어 (`src/apis/{domain}/*Api.ts`)
- 네트워크 호출과 데이터 반환만 담당한다.
- React 의존 코드(`useQuery`, `useMutation`)를 넣지 않는다.
- 함수명은 비즈니스 동작 중심으로 작성한다. (예: `getMyUser`, `submitTestAnswers`, `grantDotoriToUser`)

### Hook 레이어 (`src/hooks/**`)
- API 함수를 TanStack Query로 감싼다.
- 캐싱, 로딩, 에러, invalidate 정책을 담당한다.

## 3. 디렉터리/파일 규칙
- `src/apis/{domain}/{domain}Api.ts`
- `src/hooks/queries/{domain}/useXxxQuery.ts`
- `src/hooks/mutations/{domain}/useXxxMutation.ts`
- `src/hooks/queryKeys.ts`에 Query Key를 모아서 관리한다.

## 4. 네이밍 규칙
- Query Hook: `useXxxQuery`
- Mutation Hook: `useXxxMutation`
- API 함수: `get/create/update/delete` + 도메인 의미
- Query Key: `queryKeys.{domain}.{resource}(params?)`

## 5. Query Key 규칙
- 문자열 하드코딩 금지. 반드시 `queryKeys` 함수 사용.
- 파라미터가 있으면 key 마지막에 객체를 포함한다.
- 예시:
  - `queryKeys.admin.dashboard() -> ['admin', 'dashboard']`
  - `queryKeys.admin.userSearch({ phoneLast4 }) -> ['admin', 'userSearch', { phoneLast4 }]`

## 6. Query/Mutation 사용 기준
- 조회(GET): `useQuery`
- 변경(POST/PUT/PATCH/DELETE): `useMutation`
- React 외부 단발성 로직(예: 초기화 스크립트)은 API 함수 직접 호출 가능

## 7. 에러/로딩 처리 규칙
- 훅에서는 `isPending`, `isFetching`, `isError` 상태를 UI에 노출한다.
- 에러 메시지는 사용자 노출용과 디버깅용을 분리한다.
- API 함수는 실패 시 `throw`하여 훅의 `onError`에서 처리 가능하게 한다.

## 8. Mutation 성공 후 처리 규칙
- 기본 정책: 관련 Query를 `invalidateQueries` 한다.
- 즉시 UI 반영이 필요한 경우에만 `setQueryData` 사용.
- invalidate 대상은 훅 파일에 주석 또는 함수명으로 의도가 드러나게 작성한다.

## 9. 인증/토큰 규칙
- Supabase Auth 호출은 supabase client 세션을 기본 사용한다.
- 일반 REST 호출이 필요한 경우 `Authorization: Bearer <token>`을 명시한다.
- 토큰 처리 방식은 API 레이어에서 통일하고, 컴포넌트에서 헤더를 직접 조립하지 않는다.

## 10. 협업 규칙 (2인 팀)
- 도메인 단위로 작업한다. (예: 한 사람이 `admin`의 UI/훅/API를 함께 담당)
- PR 리뷰 시 아래 체크리스트를 기준으로 확인한다.
- 컨벤션 변경은 문서 먼저 수정 후 코드 반영한다.
- `src/hooks/queryKeys.ts`, 공통 타입 파일, 컨벤션 문서는 수정 전 팀원에게 공유한다.

## 11. PR 체크리스트
- [ ] API 함수에 React 의존 코드가 없다.
- [ ] Query Key를 하드코딩하지 않고 `queryKeys`를 사용했다.
- [ ] Query/Mutation 선택이 HTTP 동작에 맞다.
- [ ] `onSuccess`의 invalidate 대상이 누락되지 않았다.
- [ ] 에러/로딩 상태가 UI에서 처리된다.

