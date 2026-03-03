import { useState } from 'react';
import { Button, GroupBox, Window, WindowContent } from 'react95';
import styled from 'styled-components';
import { useUserSearchQuery } from '../../hooks/queries/admin';
import { useGrantDotoriMutation } from '../../hooks/mutations/admin';
import UserSearchForm from '../../components/features/admin/UserSearchForm';
import UserSearchResultItem from '../../components/features/admin/UserSearchResultItem';
import { colors } from '../../styles/colors';
import Modal from '../../components/shared/Modal';
import { ActionDetail, ActionDetailLabel } from '../../constants';
import type { GrantDotoriReason } from '../../apis/admin/adminApi';

const StyledWindow = styled(Window)`
  width: 100%;
  margin-top: 24px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

const ResultsSection = styled.div`
  margin-top: 8px;
`;

const ResultsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ErrorMessage = styled.p`
  margin: 0;
  color: ${colors.error};
  font-size: 12px;
`;

const EmptyMessage = styled.p`
  margin: 0;
  color: ${colors.textMuted};
  font-size: 12px;
  text-align: center;
  padding: 16px;
`;

const GrantSection = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 2px solid ${colors.divider};
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SelectedUserInfo = styled.div`
  padding: 12px;
  background: ${colors.material};
  border: 2px solid ${colors.borderDark};
  font-size: 12px;
  color: ${colors.canvasText};
`;

const ModalActions = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const ReasonList = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
`;

const ReasonItem = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const UserSearchContainer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [grantTargetUserId, setGrantTargetUserId] = useState<string | null>(null);
  const [selectedReason, setSelectedReason] = useState<GrantDotoriReason>('FOLLOW');

  // 유저 검색 (검색 버튼을 눌렀을 때만 실행)
  const {
    data: searchResults = [],
    isLoading: isSearching,
    error: searchError,
    refetch: refetchSearch,
  } = useUserSearchQuery({ phone_last4: searchQuery }, hasSearched);

  // 도토리 증정
  const grantMutation = useGrantDotoriMutation({
    onSuccess: (data) => {
      alert(`도토리 1개가 증정되었습니다!\n${data.user_id}의 현재 도토리: ${data.dotori}개`);
      setGrantTargetUserId(null);
      // 검색 결과 다시 불러오기
      refetchSearch();
    },
    onError: (error) => {
      alert(`도토리 증정 실패: ${error.message}`);
    },
  });

  const handleSearch = (phoneLast4: string) => {
    setHasSearched(true);
    setSearchQuery(phoneLast4); // searchQuery 변경 시 자동으로 쿼리 실행됨
  };

  const handleGrantDotori = () => {
    if (!grantTargetUserId) {
      alert('유저를 선택해주세요.');
      return;
    }

    if (!selectedReason) {
      alert('지급 사유를 선택해주세요.');
      return;
    }

    grantMutation.mutate({
      user_id: grantTargetUserId,
      reason: selectedReason,
    });
  };

  const handleOpenGrantModal = (userId: string) => {
    setGrantTargetUserId(userId);
    const user = searchResults.find((u) => u.user_id === userId);
    if (user) {
      if (user.canGiveFollow) {
        setSelectedReason('FOLLOW');
      } else if (user.canGiveStory) {
        setSelectedReason('STORY');
      } else {
        setSelectedReason('GAME1');
      }
    } else {
      setSelectedReason('FOLLOW');
    }
  };

  const handleCloseGrantModal = () => {
    setGrantTargetUserId(null);
  };

  const grantTargetUser = searchResults.find((user) => user.user_id === grantTargetUserId) ?? null;

  return (
    <StyledWindow>
      <WindowContent>
        <GroupBox label="User Search">
          <Form>
            <UserSearchForm
              onSearch={handleSearch}
              isSearching={isSearching}
              isGranting={grantMutation.isPending}
            />

            {searchError && (
              <ErrorMessage>
                {searchError instanceof Error
                  ? searchError.message
                  : '검색 중 오류가 발생했습니다.'}
              </ErrorMessage>
            )}

            {searchResults.length > 0 && (
              <ResultsSection>
                <ResultsList>
                  {searchResults.map((user) => (
                    <UserSearchResultItem
                      key={user.user_id}
                      user={user}
                      onGrantClick={() => handleOpenGrantModal(user.user_id)}
                      disabled={grantMutation.isPending}
                    />
                  ))}
                </ResultsList>
              </ResultsSection>
            )}

            {hasSearched && searchResults.length === 0 && !isSearching && (
              <EmptyMessage>검색 결과가 없습니다.</EmptyMessage>
            )}

            {grantTargetUser && (
              <GrantSection>
                <SelectedUserInfo>
                  선택된 유저: <strong>{grantTargetUser.name}</strong> (도토리:{' '}
                  {grantTargetUser.dotori}개)
                </SelectedUserInfo>
              </GrantSection>
            )}

            {grantTargetUser && (
              <Modal title="도토리 증정" onClose={handleCloseGrantModal} width={340}>
                <div>
                  <p>
                    <strong>{grantTargetUser.name}</strong>님에게 도토리 1개를 증정합니다.
                  </p>
                  <ReasonList>
                    {grantTargetUser.canGiveFollow && (
                      <ReasonItem>
                        <input
                          type="radio"
                          id="reason-follow"
                          name="grant-reason"
                          value="FOLLOW"
                          checked={selectedReason === 'FOLLOW'}
                          onChange={() => setSelectedReason('FOLLOW')}
                        />
                        <span>{ActionDetailLabel[ActionDetail.FOLLOW]}</span>
                      </ReasonItem>
                    )}
                    {grantTargetUser.canGiveStory && (
                      <ReasonItem>
                        <input
                          type="radio"
                          id="reason-story"
                          name="grant-reason"
                          value="STORY"
                          checked={selectedReason === 'STORY'}
                          onChange={() => setSelectedReason('STORY')}
                        />
                        <span>{ActionDetailLabel[ActionDetail.STORY]}</span>
                      </ReasonItem>
                    )}
                    <ReasonItem>
                      <input
                        type="radio"
                        id="reason-game1"
                        name="grant-reason"
                        value="GAME1"
                        checked={selectedReason === 'GAME1'}
                        onChange={() => setSelectedReason('GAME1')}
                      />
                      <span>{ActionDetailLabel[ActionDetail.GAME1]}</span>
                    </ReasonItem>
                    <ReasonItem>
                      <input
                        type="radio"
                        id="reason-game2"
                        name="grant-reason"
                        value="GAME2"
                        checked={selectedReason === 'GAME2'}
                        onChange={() => setSelectedReason('GAME2')}
                      />
                      <span>{ActionDetailLabel[ActionDetail.GAME2]}</span>
                    </ReasonItem>
                    <ReasonItem>
                      <input
                        type="radio"
                        id="reason-game3"
                        name="grant-reason"
                        value="GAME3"
                        checked={selectedReason === 'GAME3'}
                        onChange={() => setSelectedReason('GAME3')}
                      />
                      <span>{ActionDetailLabel[ActionDetail.GAME3]}</span>
                    </ReasonItem>
                  </ReasonList>
                  <ModalActions>
                    <Button onClick={handleGrantDotori} disabled={grantMutation.isPending}>
                      지급
                    </Button>
                    <Button onClick={handleCloseGrantModal} disabled={grantMutation.isPending}>
                      취소
                    </Button>
                  </ModalActions>
                </div>
              </Modal>
            )}
          </Form>
        </GroupBox>
      </WindowContent>
    </StyledWindow>
  );
};

export default UserSearchContainer;
