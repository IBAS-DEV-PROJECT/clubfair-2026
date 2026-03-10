import { useState } from 'react';
import styled from 'styled-components';
import { Hourglass } from 'react95';
import { DotoriCard, MatchedInstagramCard, MatchScoreCard } from '../../components/features/user';
import { PrimaryButton, AlertModal } from '../../components/shared';
import useMyResultQuery from '../../hooks/queries/useMyResultQuery';
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
  const { data: userResult, isFetching: isResultFetching } = useMyResultQuery();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const entryMutation = useEnterEventMutation({
    onSuccess: (data) => {
      setSuccessMessage(
        `이벤트 1회 응모 완료 🌰\n\n남은 도토리: ${data.dotori}개\n\n도토리가 5개 이상 남아있다면 한 번 더 응모 버튼을 눌러주세요!\n\n추첨 결과는 토요일 중 마이페이지에서 확인 가능합니다.\n\n⚠️ 중요: 일요일 저녁 6시에 모든 데이터가 파기되니, 그전까지 당첨 확인 후 화면을 꼭 '캡처'해 두셔야 상품 수령이 가능합니다!`,
      );
    },
  });

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
  const score = userResult.score ?? 0;
  const instagramId = userResult.partner_instagram_id ?? '';
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
      {successMessage && (
        <AlertModal message={successMessage} onClose={() => setSuccessMessage(null)} />
      )}
    </>
  );
};

export default MyResultContainer;
