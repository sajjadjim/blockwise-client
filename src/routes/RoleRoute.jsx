import useUserInfo from "../hooks/useUserInfo";
import useAuth from "../hooks/useAuth"; // to get current user

const RoleRoute = ({ children, allowedRole }) => {
  const { user, loading: authLoading } = useAuth(); // get logged-in user
  const { role, loading: roleLoading } = useUserInfo(); // pass email

  if (authLoading || roleLoading) return <span>Loading...</span>;

  if (role !== allowedRole) return <h1>Access Denied</h1>;

  return children;
};

export default RoleRoute;

