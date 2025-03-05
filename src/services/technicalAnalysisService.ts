
import { calculateRSI, getRSIInterpretation } from "@/utils/marketCalculations";

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export const getTechnicalAnalysis = async (symbol: string) => {
  try {
    const response = await fetch(
      `${COINGECKO_API}/coins/${symbol.toLowerCase()}/ohlc?vs_currency=usd&days=14`
    );
    const data = await response.json();
    
    if (Array.isArray(data)) {
      const prices = data.map((item: number[]) => item[4]);
      const avg = prices.reduce((a: number, b: number) => a + b, 0) / prices.length;
      const rsi = calculateRSI(prices);
      const trend = prices[prices.length - 1] > avg ? "Bullish" : "Bearish";
      
      return {
        trend,
        support: `$${Math.min(...prices).toFixed(2)}`,
        resistance: `$${Math.max(...prices).toFixed(2)}`,
        rsi: `${rsi.toFixed(0)} (${getRSIInterpretation(rsi)})`,
        macd: trend === "Bullish" ? "Bullish Crossover" : "Bearish Crossover"
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting technical analysis:', error);
    return null;
  }
};
