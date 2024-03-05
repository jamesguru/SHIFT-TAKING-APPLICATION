import { Outlet } from "react";
import Sidebar from "../../components/sidebar/sidebar";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
        <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;