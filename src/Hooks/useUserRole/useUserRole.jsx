import { use, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxios from "../useAxios/useAxios";

const useUserRole = () => {
  const { user, loading } = use(AuthContext);
  const [role, setRole] = useState(null);
  const [isRoleLoading, setIsRoleLoading] = useState(true);
  const axiosInstance = useAxios();

  useEffect(() => {
    if (user?.email) {
      axiosInstance
        .get(`/users/${user.email}`)
        .then((res) => {
          setRole(res.data.role);
          setIsRoleLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch user role:", error);
          setIsRoleLoading(false);
        });
    }
  }, [user]);

  return {
    role,
    isRoleLoading,
  };
};

export default useUserRole;
