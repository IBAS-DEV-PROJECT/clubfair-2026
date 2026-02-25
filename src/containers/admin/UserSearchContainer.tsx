import { useState } from 'react';
import { Button, GroupBox, Window, WindowContent } from 'react95';
import styled from 'styled-components';
import { useUserSearchQuery } from '../../hooks/queries/admin';
import { useGrantDotoriMutation } from '../../hooks/mutations/admin';
import UserSearchForm from '../../components/features/admin/UserSearchForm';
import UserSearchResultItem from '../../components/features/admin/UserSearchResultItem';
import { colors } from '../../styles/colors';
import Modal from '../../components/shared/Modal';

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

const UserSearchContainer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [grantTargetUserId, setGrantTargetUserId] = useState<string | null>(null);

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

    grantMutation.mutate({
      user_id: grantTargetUserId,
      amount: 1, // 무조건 1개
    });
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
                      onGrantClick={() => setGrantTargetUserId(user.user_id)}
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
              <Modal
                title="도토리 증정 확인"
                onClose={() => setGrantTargetUserId(null)}
                width={320}
              >
                <div>
                  <p>
                    <strong>{grantTargetUser.name}</strong>님에게 도토리 1개를 증정하시겠습니까?
                  </p>
                  <ModalActions>
                    <Button onClick={handleGrantDotori} disabled={grantMutation.isPending}>
                      예
                    </Button>
                    <Button
                      onClick={() => setGrantTargetUserId(null)}
                      disabled={grantMutation.isPending}
                    >
                      아니오
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
