import { CryptoData, StockData } from "@/types/market";

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export const useMarketData = () => {
  const fetchCryptoData = async () => {
    try {
      const response = await fetch(
        `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&sparkline=false&price_change_percentage=24h`
      );
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
      return mockCryptoData;
    }
  };

  const mockCryptoData: CryptoData[] = [
    { id: "BTCUSD", symbol: "BTC", name: "Bitcoin", current_price: 65000, price_change_percentage_24h: 2.5, market_cap: 1200000000000, total_volume: 30000000000 },
    { id: "ETHUSD", symbol: "ETH", name: "Ethereum", current_price: 3500, price_change_percentage_24h: 1.8, market_cap: 420000000000, total_volume: 15000000000 },
    { id: "BNBUSD", symbol: "BNB", name: "Binance Coin", current_price: 450, price_change_percentage_24h: -0.5, market_cap: 75000000000, total_volume: 2000000000 },
    { id: "SOLANA", symbol: "SOL", name: "Solana", current_price: 120, price_change_percentage_24h: 3.2, market_cap: 50000000000, total_volume: 1500000000 },
    { id: "ADAUSDT", symbol: "ADA", name: "Cardano", current_price: 0.65, price_change_percentage_24h: 1.1, market_cap: 25000000000, total_volume: 800000000 },
    { id: "RIPPLE", symbol: "XRP", name: "Ripple", current_price: 0.55, price_change_percentage_24h: -1.2, market_cap: 30000000000, total_volume: 1200000000 },
    { id: "DOTUSD", symbol: "DOT", name: "Polkadot", current_price: 7.8, price_change_percentage_24h: 2.8, market_cap: 10000000000, total_volume: 500000000 },
    { id: "DOGEUSDT", symbol: "DOGE", name: "Dogecoin", current_price: 0.08, price_change_percentage_24h: -0.9, market_cap: 12000000000, total_volume: 600000000 },
    { id: "AVAXUSD", symbol: "AVAXUSD", name: "Avalanche", current_price: 35, price_change_percentage_24h: 4.2, market_cap: 12500000000, total_volume: 700000000 },
    { id: "LINKUSDT", symbol: "LINK", name: "Chainlink", current_price: 18, price_change_percentage_24h: 1.5, market_cap: 9000000000, total_volume: 450000000 },
    { id: "MATICUSD", symbol: "MATIC", name: "Polygon", current_price: 0.85, price_change_percentage_24h: 2.1, market_cap: 8500000000, total_volume: 400000000 },
    { id: "UNIUSD", symbol: "UNIUSD", name: "Uniswap", current_price: 7.2, price_change_percentage_24h: -1.8, market_cap: 5500000000, total_volume: 300000000 },
    { id: "STELLAR", symbol: "XLM", name: "Stellar", current_price: 0.12, price_change_percentage_24h: 0.5, market_cap: 4000000000, total_volume: 200000000 },
    { id: "ALGOUSDT", symbol: "ALGO", name: "Algorand", current_price: 0.18, price_change_percentage_24h: 1.2, market_cap: 2000000000, total_volume: 100000000 },
    { id: "COSMOS", symbol: "ATOM", name: "Cosmos", current_price: 8.5, price_change_percentage_24h: 3.1, market_cap: 3500000000, total_volume: 150000000 },
    { id: "NEAR", symbol: "NEAR", name: "NEAR Protocol", current_price: 2.8, price_change_percentage_24h: 2.4, market_cap: 3000000000, total_volume: 120000000 },
    { id: "FTMUSDT", symbol: "FTM", name: "Fantom", current_price: 0.45, price_change_percentage_24h: 5.2, market_cap: 1500000000, total_volume: 80000000 },
    { id: "XTZUSDT", symbol: "XTZ", name: "Tezos", current_price: 1.2, price_change_percentage_24h: -0.8, market_cap: 1200000000, total_volume: 60000000 },
    { id: "AAVE", symbol: "AAVE", name: "Aave", current_price: 95, price_change_percentage_24h: 1.9, market_cap: 1400000000, total_volume: 70000000 },
    { id: "THETA", symbol: "THETA", name: "Theta Network", current_price: 0.95, price_change_percentage_24h: 0.7, market_cap: 1100000000, total_volume: 50000000 }
  ];

  return { data: mockCryptoData, isLoading: false };
};

export const useStockData = () => {
  const mockStockData: StockData[] = [
    { id: "RELIANCE", symbol: "RELIANCE", name: "Reliance Industries", current_price: 2500, price_change_percentage_24h: 1.2, market_cap: 17000000000000, total_volume: 500000000 },
    { id: "TCS", symbol: "TCS", name: "Tata Consultancy Services", current_price: 3800, price_change_percentage_24h: -0.5, market_cap: 14000000000000, total_volume: 300000000 },
    { id: "HDFCBANK", symbol: "HDFCBANK", name: "HDFC Bank", current_price: 1650, price_change_percentage_24h: 0.8, market_cap: 12000000000000, total_volume: 250000000 },
    { id: "INFY", symbol: "INFY", name: "Infosys", current_price: 1450, price_change_percentage_24h: -1.2, market_cap: 6000000000000, total_volume: 150000000 },
    { id: "HINDUNILVR", symbol: "HINDUNILVR", name: "Hindustan Unilever", current_price: 2450, price_change_percentage_24h: 0.3, market_cap: 5500000000000, total_volume: 120000000 },
    { id: "ICICIBANK", symbol: "ICICIBANK", name: "ICICI Bank", current_price: 960, price_change_percentage_24h: 1.5, market_cap: 7000000000000, total_volume: 180000000 },
    { id: "SBIN", symbol: "SBIN", name: "State Bank of India", current_price: 620, price_change_percentage_24h: 2.1, market_cap: 5500000000000, total_volume: 160000000 },
    { id: "BHARTIARTL", symbol: "BHARTIARTL", name: "Bharti Airtel", current_price: 875, price_change_percentage_24h: -0.7, market_cap: 4800000000000, total_volume: 140000000 },
    { id: "ITC", symbol: "ITC", name: "ITC", current_price: 420, price_change_percentage_24h: 0.9, market_cap: 5200000000000, total_volume: 150000000 },
    { id: "KOTAKBANK", symbol: "KOTAKBANK", name: "Kotak Mahindra Bank", current_price: 1750, price_change_percentage_24h: -0.4, market_cap: 3500000000000, total_volume: 90000000 },
    { id: "LT", symbol: "LT", name: "Larsen & Toubro", current_price: 2950, price_change_percentage_24h: 1.8, market_cap: 4100000000000, total_volume: 110000000 },
    { id: "WIPRO", symbol: "WIPRO", name: "Wipro", current_price: 420, price_change_percentage_24h: -1.1, market_cap: 2300000000000, total_volume: 70000000 },
    { id: "HCLTECH", symbol: "HCLTECH", name: "HCL Technologies", current_price: 1180, price_change_percentage_24h: 0.6, market_cap: 3200000000000, total_volume: 85000000 },
    { id: "ASIANPAINT", symbol: "ASIANPAINT", name: "Asian Paints", current_price: 3150, price_change_percentage_24h: -0.3, market_cap: 3000000000000, total_volume: 80000000 },
    { id: "MARUTI", symbol: "MARUTI", name: "Maruti Suzuki", current_price: 9800, price_change_percentage_24h: 1.4, market_cap: 2950000000000, total_volume: 75000000 },
    { id: "AXISBANK", symbol: "AXISBANK", name: "Axis Bank", current_price: 960, price_change_percentage_24h: 0.8, market_cap: 2900000000000, total_volume: 73000000 },
    { id: "TATAMOTORS", symbol: "TATAMOTORS", name: "Tata Motors", current_price: 780, price_change_percentage_24h: 2.3, market_cap: 2600000000000, total_volume: 68000000 },
    { id: "SUNPHARMA", symbol: "SUNPHARMA", name: "Sun Pharma", current_price: 1120, price_change_percentage_24h: -0.5, market_cap: 2700000000000, total_volume: 70000000 },
    { id: "BAJFINANCE", symbol: "BAJFINANCE", name: "Bajaj Finance", current_price: 6900, price_change_percentage_24h: 1.1, market_cap: 4150000000000, total_volume: 105000000 },
    { id: "TATASTEEL", symbol: "TATASTEEL", name: "Tata Steel", current_price: 125, price_change_percentage_24h: 1.6, market_cap: 1500000000000, total_volume: 45000000 }
  ];

  return { data: mockStockData, isLoading: false };
};

export const getTechnicalAnalysis = async (symbol: string) => {
  try {
    const response = await fetch(
      `${COINGECKO_API}/coins/${symbol.toLowerCase()}/ohlc?vs_currency=usd&days=14`
    );
    const data = await response.json();
    
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
  } catch (error) {
    console.error('Error getting technical analysis:', error);
    return null;
  }
};

export const getSentimentAnalysis = async (symbol: string) => {
  try {
    const response = await fetch(
      `${COINGECKO_API}/coins/${symbol.toLowerCase()}?localization=false&tickers=false&community_data=true&developer_data=false&sparkline=false`
    );
    const data = await response.json();
    
    const sentiment = data.sentiment_votes_up_percentage;
    const score = (sentiment / 100) * 10;
    
    return {
      overall: sentiment > 60 ? "Positive" : sentiment > 40 ? "Neutral" : "Negative",
      socialScore: `${score.toFixed(1)}/10`,
      sentiment: sentiment > 60 ? "Bullish" : sentiment > 40 ? "Neutral" : "Bearish",
      outlook: sentiment > 60 ? "Optimistic" : sentiment > 40 ? "Neutral" : "Cautious",
      fearGreed: `${sentiment.toFixed(0)} (${sentiment > 60 ? "Greed" : sentiment > 40 ? "Neutral" : "Fear"})`
    };
  } catch (error) {
    console.error('Error getting sentiment analysis:', error);
    return null;
  }
};

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

function calculateRSI(prices: number[]): number {
  const gains = [];
  const losses = [];
  
  for (let i = 1; i < prices.length; i++) {
    const difference = prices[i] - prices[i - 1];
    if (difference >= 0) {
      gains.push(difference);
      losses.push(0);
    } else {
      gains.push(0);
      losses.push(Math.abs(difference));
    }
  }
  
  const avgGain = gains.reduce((a, b) => a + b, 0) / gains.length;
  const avgLoss = losses.reduce((a, b) => a + b, 0) / losses.length;
  
  if (avgLoss === 0) return 100;
  
  const rs = avgGain / avgLoss;
  return 100 - (100 / (1 + rs));
}

function getRSIInterpretation(rsi: number): string {
  if (rsi > 70) return "Overbought";
  if (rsi < 30) return "Oversold";
  return "Neutral";
}

function calculateVolatility(prices: number[]): number {
  const returns = [];
  for (let i = 1; i < prices.length; i++) {
    returns.push((prices[i] - prices[i - 1]) / prices[i - 1]);
  }
  
  const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance = returns.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / returns.length;
  return Math.sqrt(variance) * 100;
}
