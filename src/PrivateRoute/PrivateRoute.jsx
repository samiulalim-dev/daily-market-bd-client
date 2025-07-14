import React, { use } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Loading from "../Shared/Logo/Loading/Loading";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();
  if (loading) {
    return <Loading></Loading>;
  }
  if (!user) {
    return <Navigate to="/logIn" state={{ from: location }} replace></Navigate>;
  }

  return children;
};

export default PrivateRoute;
