
import { useQuery } from "@tanstack/react-query";
import { CryptoData } from "@/types/market";
import { useMarketStore } from "@/stores/marketStore";

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export const fetchCryptoData = async (): Promise<CryptoData[]> => {
  try {
    const response = await fetch(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&sparkline=false&price_change_percentage=24h`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch crypto data');
    }
    
    const data = await response.json();
    return data.map((coin: any) => ({
      id: coin.id,
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      current_price: coin.current_price,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      market_cap: coin.market_cap,
      total_volume: coin.total_volume,
    }));
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    // Return mock data if the API call fails
    return Array(20).fill(0).map((_, index) => ({
      id: `crypto-${index}`,
      symbol: `CRYPTO${index}`,
      name: `Cryptocurrency ${index}`,
      current_price: Math.random() * 1000,
      price_change_percentage_24h: (Math.random() - 0.5) * 5,
      market_cap: Math.random() * 10000000,
      total_volume: Math.random() * 100000,
    }));
  }
};

export const useMarketData = () => {
  const { currency } = useMarketStore();
  
  return useQuery({
    queryKey: ['cryptoData', currency],
    queryFn: fetchCryptoData,
    refetchInterval: 20000, // Faster refresh every 20 seconds
    staleTime: 10000,     // Data considered fresh for 10 seconds
  });
};
