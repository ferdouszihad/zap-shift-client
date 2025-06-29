import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUnPaidParcel = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: parcels = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcel/unpaid/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return { parcels, isLoading, error, refetch };
};

export default useUnPaidParcel;
