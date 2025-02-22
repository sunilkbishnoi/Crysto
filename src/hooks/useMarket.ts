
import { useQuery } from "@tanstack/react-query";
import { useMarketStore } from "@/stores/marketStore";
import { fetchMarketData } from "@/services/crypto";
import { fetchStockData } from "@/services/stocks";
import { fetchMarketNews } from "@/services/news";

export const useMarketData = () => {
  const { currency } = useMarketStore();
  return useQuery({
    queryKey: ["marketData", currency],
    queryFn: () => fetchMarketData(currency),
    refetchInterval: 10000,
    staleTime: 5000,
    retry: 1,
  });
};

export const useStockData = () => {
  const { currency } = useMarketStore();
  return useQuery({
    queryKey: ["stockData", currency],
    queryFn: () => fetchStockData(currency),
    refetchInterval: 10000,
    staleTime: 5000,
    retry: 1,
  });
};

export const useNewsData = () => {
  return useQuery({
    queryKey: ["news"],
    queryFn: fetchMarketNews,
    refetchInterval: 60000,
    staleTime: 30000,
    retry: 2,
  });
};
