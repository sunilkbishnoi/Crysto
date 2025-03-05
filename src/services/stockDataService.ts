
import { useQuery } from "@tanstack/react-query";
import { INDIAN_STOCKS } from "@/constants/market";
import { StockData } from "@/types/market";
import { useMarketStore } from "@/stores/marketStore";
import { CURRENCY_CONVERSION_RATE } from "@/utils/formatters";

export const fetchStockData = async (currency: string = 'inr'): Promise<StockData[]> => {
  // Generate consistent prices regardless of currency parameter
  // Currency conversion will be handled at display time
  return INDIAN_STOCKS.map((stock) => ({
    id: stock.symbol.toLowerCase(),
    symbol: stock.bseCode,
    name: stock.name,
    current_price: Math.random() * 1000, // Base price in INR
    price_change_percentage_24h: (Math.random() - 0.5) * 5,
    market_cap: Math.random() * 10000000, // Base market cap in INR
    total_volume: Math.random() * 100000,
  }));
};

export const useStockData = () => {
  const { currency } = useMarketStore();
  
  return useQuery({
    queryKey: ['stockData', currency],
    queryFn: () => fetchStockData(),
    refetchInterval: 30000, // Refresh every 30 seconds to match crypto refresh rate
    staleTime: 15000,
  });
};
