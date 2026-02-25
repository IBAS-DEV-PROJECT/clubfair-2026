import DashboardContainer from '../../containers/admin/DashboardContainer';
import UserSearchContainer from '../../containers/admin/UserSearchContainer';
import AdminContentWrapper from '../../components/features/admin/AdminContentWrapper';

const AdminPage = () => {
  return (
    <AdminContentWrapper $variant="dashboard">
      <DashboardContainer />
      <UserSearchContainer />
    </AdminContentWrapper>
  );
};

export default AdminPage;
