import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const usePaidParcel = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: parcels = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["parcels-paid", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcel/${user?.email}?status=paid`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return { parcels, isLoading, error, refetch };
};

export default usePaidParcel;
