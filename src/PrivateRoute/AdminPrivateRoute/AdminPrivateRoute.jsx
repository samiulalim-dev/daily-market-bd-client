import { use } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useUserRole from "../../Hooks/useUserRole/useUserRole";
import Loading from "../../Shared/Logo/Loading/Loading";
import Forbidden from "../../Shared/Forbidden/Forbidden";

const AdminPrivateRoute = () => {
  const { user, loading } = use(AuthContext);
  const { role, isRoleLoading } = useUserRole();

  if (loading || isRoleLoading) {
    return <Loading></Loading>;
  }

  if (role !== "admin") {
    return <Forbidden></Forbidden>;
  }
};

export default AdminPrivateRoute;
