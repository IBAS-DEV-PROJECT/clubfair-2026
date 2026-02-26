import styled from 'styled-components';
import { Hourglass } from 'react95';
import { DotoriCard, MatchedInstagramCard, MatchScoreCard } from '../../components/features/user';
import { PrimaryButton } from '../../components/shared';
import { useUserResultQuery } from '../../hooks/queries/useUserResultQuery';
import { useEnterEventMutation } from '../../hooks/mutations/user';
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
  const { data: userResult, isFetching: isResultFetching } = useUserResultQuery();
  const entryMutation = useEnterEventMutation();

  if (isResultFetching) {
    return (
      <LoadingContainer>
        <Hourglass size={32} />
        <p>정보를 불러오는 중입니다...</p>
      </LoadingContainer>
    );
  }

  if (!userResult) {
    return (
      <LoadingContainer>
        <p>테스트를 먼저 완료해 주세요.</p>
      </LoadingContainer>
    );
  }

  const dotori = userResult.dotori;
  const score = userResult.score;
  const instagramId = userResult.partner_instagram_id;
  const history = userResult.dotori_history.map((item, index) => ({
    id: `${item.created_at}-${index}`,
    label: ActionDetailLabel[item.detail],
    change: item.change,
    createdAt: formatPostgresDateTime(item.created_at),
  }));

  return (
    <>
      <MatchedInstagramCard instagramId={instagramId} />
      <MatchScoreCard score={score} />
      <DotoriCard dotori={dotori} history={history} />
      <PrimaryButton
        type="apply"
        dotori={dotori}
        isPending={entryMutation.isPending}
        onClick={() => entryMutation.mutate()}
      >
        응모하기
      </PrimaryButton>
    </>
  );
};

export default MyResultContainer;
