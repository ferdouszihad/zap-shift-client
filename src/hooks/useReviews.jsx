import { useQuery } from "@tanstack/react-query";

const useReviews = () => {
  const {
    data: reviews = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await fetch("/reviews.json");
      return await res.json();
    },
  });

  return { reviews, isLoading, error, refetch };
};

export default useReviews;
