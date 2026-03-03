import { Route, Routes } from 'react-router-dom';
import { AdminPage, AdminSettingPage } from '../pages';
import { ProtectedAdminLayout } from '../layouts';
import { AdminRole } from '../constants';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedAdminLayout requiredRole={AdminRole.ADMIN} />}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>
      <Route element={<ProtectedAdminLayout requiredRole={AdminRole.SUPER_ADMIN} />}>
        <Route path="/admin/setting" element={<AdminSettingPage />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
