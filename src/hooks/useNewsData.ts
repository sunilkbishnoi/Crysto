
import { useQuery } from "@tanstack/react-query";
import { fetchMarketNews } from "@/services/news";

export const useNewsData = () => {
  return useQuery({
    queryKey: ["news"],
    queryFn: fetchMarketNews,
    refetchInterval: 60000,
    staleTime: 30000,
    retry: 2,
  });
};
