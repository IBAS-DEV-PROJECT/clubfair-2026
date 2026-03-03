import TimeSettingContainer from '../../containers/admin/TimeSettingContainer';
import EventDrawContainer from '../../containers/admin/EventDrawContainer';
import AdminContentWrapper from '../../components/features/admin/AdminContentWrapper';

const AdminSettingPage = () => {
  return (
    <AdminContentWrapper $variant="setting">
      <TimeSettingContainer />
      <EventDrawContainer />
    </AdminContentWrapper>
  );
};

export default AdminSettingPage;
