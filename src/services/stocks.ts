
import { INDIAN_STOCKS } from "@/constants/market";
import { MarketData } from "@/types/market";

export const fetchStockData = async (currency: string = 'inr'): Promise<MarketData[]> => {
  return INDIAN_STOCKS.map((stock, index) => ({
    id: stock.symbol.toLowerCase(),
    symbol: stock.bseCode,
    name: stock.name,
    current_price: Math.random() * 1000 * (currency.toLowerCase() === 'usd' ? 1 : 82.5),
    price_change_percentage_24h: (Math.random() - 0.5) * 5,
    market_cap: Math.random() * 1000000 * (currency.toLowerCase() === 'usd' ? 1 : 82.5),
    circulating_supply: Math.random() * 1000000,
    total_volume: Math.random() * 100000,
    market_cap_rank: index + 1
  }));
};
