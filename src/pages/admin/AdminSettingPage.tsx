import styled from 'styled-components';
import TimeSettingContainer from '../../containers/admin/TimeSettingContainer';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const AdminSettingPage = () => {
  return (
    <Wrapper>
      <TimeSettingContainer />
    </Wrapper>
  );
};

export default AdminSettingPage;
