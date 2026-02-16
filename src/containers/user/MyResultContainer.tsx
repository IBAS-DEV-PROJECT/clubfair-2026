import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { Hourglass } from 'react95';
import {
  DotoriCard,
  EntryButton,
  MatchedInstagramCard,
  MatchScoreCard,
} from '../../components/features/user';
import { enterEvent, getMyActions, getMyMatches, getMyUser } from '../../apis/user/userApi';
import { queryKeys } from '../../hooks/queryKeys';
import { formatPostgresDateTime } from '../../utils/date';
import { ActionDetailLabel } from '../../constants';

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 40px;
`;

const MyResultContainer = () => {
  const queryClient = useQueryClient();

  // 유저 정보 조회
  const { data: myUser, isFetching: isUserFetching } = useQuery({
    queryKey: queryKeys.user.myUser(),
    queryFn: getMyUser,
  });

  // 유저 액션 조회
  const { data: myActions, isFetching: isActionsFetching } = useQuery({
    queryKey: queryKeys.user.myActions(),
    queryFn: getMyActions,
  });

  // 유저 매칭 정보 조회
  const { data: myMatches, isFetching: isMatchesFetching } = useQuery({
    queryKey: queryKeys.user.myMatches(),
    queryFn: getMyMatches,
  });

  // 이벤트 응모 처리
  const entryMutation = useMutation({
    mutationFn: () => enterEvent({ cost: 5 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.myUser() });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.myActions() });
    },
  });

  if (isUserFetching || isActionsFetching || isMatchesFetching) {
    return (
      <LoadingContainer>
        <Hourglass size={32} />
        <p>정보를 불러오는 중입니다...</p>
      </LoadingContainer>
    );
  }

  // Early return 처리할지 말지 고민 중
  const firstMatch = myMatches?.[0];
  const dotori = myUser?.dotori ?? 0;
  const score = firstMatch?.score ?? 0;
  const instagramId = firstMatch?.partner_instagram_id ?? '-';

  const history =
    myActions?.map((item, index) => ({
      id: `${item.created_at}-${index}`,
      label: ActionDetailLabel[item.detail],
      change: item.change,
      createdAt: formatPostgresDateTime(item.created_at),
    })) ?? [];

  return (
    <>
      <MatchedInstagramCard instagramId={instagramId} />
      <MatchScoreCard score={score} />
      <DotoriCard dotori={dotori} history={history} />
      <EntryButton
        dotori={dotori}
        isPending={entryMutation.isPending}
        onClick={() => entryMutation.mutate()}
      />
    </>
  );
};

export default MyResultContainer;
