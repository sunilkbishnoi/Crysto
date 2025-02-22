
import { BINANCE_API_BASE, CRYPTO_PAIRS } from "@/constants/market";
import { MarketData } from "@/types/market";

// Function to fetch USD to INR conversion rate
export const fetchUSDINRRate = async () => {
  try {
    const response = await fetch(`${BINANCE_API_BASE}/ticker/price?symbol=USDTBUSD`);
    const data = await response.json();
    return parseFloat(data.price) * 82.5;
  } catch (error) {
    console.error('Error fetching USD/INR rate:', error);
    return 82.5;
  }
};

// Function to fetch cryptocurrency price from Binance
const fetchCryptoPrice = async (symbol: string) => {
  try {
    console.log(`Fetching price for ${symbol}`);
    const response = await fetch(`${BINANCE_API_BASE}/ticker/24hr?symbol=${symbol}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      current_price: parseFloat(data.lastPrice),
      price_change_percentage_24h: parseFloat(data.priceChangePercent),
      total_volume: parseFloat(data.volume),
      market_cap: parseFloat(data.lastPrice) * parseFloat(data.volume),
      high_24h: parseFloat(data.highPrice),
      low_24h: parseFloat(data.lowPrice)
    };
  } catch (error) {
    console.error(`Error fetching price for ${symbol}:`, error);
    return null;
  }
};

// Main function to fetch market data
export const fetchMarketData = async (currency: string = 'inr'): Promise<MarketData[]> => {
  try {
    const usdInrRate = await fetchUSDINRRate();
    console.log('Current USD/INR rate:', usdInrRate);

    const cryptoPromises = CRYPTO_PAIRS.map(async (pair) => {
      const priceData = await fetchCryptoPrice(pair.symbol);
      
      if (!priceData) {
        console.error(`Failed to fetch data for ${pair.symbol}`);
        return null;
      }

      const priceInLocalCurrency = currency.toLowerCase() === 'usd' 
        ? priceData.current_price 
        : priceData.current_price * usdInrRate;

      return {
        id: pair.displaySymbol.toLowerCase(),
        symbol: pair.displaySymbol,
        name: pair.name,
        current_price: priceInLocalCurrency,
        price_change_percentage_24h: priceData.price_change_percentage_24h,
        market_cap: priceData.market_cap * (currency.toLowerCase() === 'usd' ? 1 : usdInrRate),
        circulating_supply: 0,
        total_volume: priceData.total_volume,
        market_cap_rank: 0
      };
    });

    const results = await Promise.all(cryptoPromises);
    return results.filter((result): result is MarketData => result !== null);
  } catch (error) {
    console.error('Error fetching market data:', error);
    throw error;
  }
};
