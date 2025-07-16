import React from "react";
import PriceTrends from "../PriceTrends/PriceTrends";
import MyProduct from "../MyProduct/MyProduct";
import AllUser from "../AllUser/AllUser";
import Loading from "../../../Shared/Logo/Loading/Loading";
import useUserRole from "../../../Hooks/useUserRole/useUserRole";

const DashboardHome = () => {
  const { role, isRoleLoading } = useUserRole();

  if (isRoleLoading) {
    return <Loading></Loading>;
  }
  if (role === "admin") {
    return <AllUser></AllUser>;
  }
  if (role === "vendor") {
    return <MyProduct></MyProduct>;
  }
  return <PriceTrends></PriceTrends>;
};

export default DashboardHome;
