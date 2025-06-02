import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

const useWareHouseData = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const {
    data: warehouses = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["warehouse"],
    queryFn: async () => {
      const res = await axios.get("/warehouse");
      return res.data;
    },
    enabled: !!user?.email,
  });

  return { warehouses, isLoading, error, refetch };
};

export default useWareHouseData;
