import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: role = "",
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/role/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return { role, isLoading, error, refetch };
};

export default useUserRole;
