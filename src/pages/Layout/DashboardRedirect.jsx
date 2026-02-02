import { Navigate } from "react-router";
import useUserInfo from "../../hooks/useUserInfo";

const DashboardRedirect = () => {
  const { role, loading } = useUserInfo();

  if (loading) return <div className="text-center p-10">Loading Dashboard...</div>;

  if (role === "user") return <Navigate to="/dashboard/user" replace />;
  if (role === "member") return <Navigate to="/dashboard/member" replace />;
  if (role === "admin") return <Navigate to="/dashboard/admin" replace />;

  return <div className="text-red-500">Unknown role or access denied</div>;
};

export default DashboardRedirect;

