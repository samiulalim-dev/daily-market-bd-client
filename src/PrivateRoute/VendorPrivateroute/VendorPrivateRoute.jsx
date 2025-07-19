import React, { use } from "react";
import Loading from "../../Shared/Logo/Loading/Loading";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useUserRole from "../../Hooks/useUserRole/useUserRole";
import Forbidden from "../../Shared/Forbidden/Forbidden";

const VendorPrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const { role, isRoleLoading } = useUserRole();

  if (loading || isRoleLoading) {
    return <Loading></Loading>;
  }

  if (role !== "vendor") {
    return <Forbidden></Forbidden>;
  }
  return children;
};

export default VendorPrivateRoute;
