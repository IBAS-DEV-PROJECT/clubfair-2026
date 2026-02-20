import styled from 'styled-components';
import TimeSettingContainer from '../../containers/admin/TimeSettingContainer';
import EventDrawContainer from '../../containers/admin/EventDrawContainer';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 40px;
  padding-bottom: 20px;
`;

const AdminSettingPage = () => {
  return (
    <Wrapper>
      <TimeSettingContainer />
      <EventDrawContainer />
    </Wrapper>
  );
};

export default AdminSettingPage;
