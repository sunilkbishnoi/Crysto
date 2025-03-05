
import { calculateVolatility } from "@/utils/marketCalculations";

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export const getPricePredictions = async (symbol: string) => {
  try {
    const response = await fetch(
      `${COINGECKO_API}/coins/${symbol.toLowerCase()}/market_chart?vs_currency=usd&days=30&interval=daily`
    );
    const data = await response.json();
    
    const prices = data.prices.map((item: number[]) => item[1]);
    const volatility = calculateVolatility(prices);
    const currentPrice = prices[prices.length - 1];
    
    return {
      day: `$${(currentPrice * (1 + volatility * 0.01)).toFixed(2)}`,
      week: `$${(currentPrice * (1 + volatility * 0.03)).toFixed(2)}`,
      month: `$${(currentPrice * (1 + volatility * 0.05)).toFixed(2)}`,
      confidence: `${(85 - volatility * 10).toFixed(0)}%`,
      risk: volatility > 5 ? "High" : volatility > 3 ? "Medium" : "Low"
    };
  } catch (error) {
    console.error('Error getting price predictions:', error);
    return null;
  }
};
