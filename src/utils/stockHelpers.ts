
/**
 * Utility functions for stocks
 */

// Helper function to get stock names
export const getStockName = (symbol: string): string => {
  const stockNames: { [key: string]: string } = {
    'AAPL': 'Apple Inc.',
    'GOOGL': 'Alphabet Inc.',
    'MSFT': 'Microsoft Corporation',
    'AMZN': 'Amazon.com Inc.',
    'TSLA': 'Tesla Inc.',
    'META': 'Meta Platforms Inc.',
    'NVDA': 'NVIDIA Corporation',
    'JPM': 'JPMorgan Chase & Co.',
    'V': 'Visa Inc.',
    'WMT': 'Walmart Inc.',
  };
  return stockNames[symbol] || symbol;
};

// Helper function to calculate approximate market cap
export const calculateMarketCap = (price: number, symbol: string): number => {
  const sharesOutstanding: { [key: string]: number } = {
    'AAPL': 16_500_000_000,
    'GOOGL': 6_000_000_000,
    'MSFT': 7_500_000_000,
    'AMZN': 10_000_000_000,
    'TSLA': 3_200_000_000,
    'META': 2_600_000_000,
    'NVDA': 2_500_000_000,
    'JPM': 2_900_000_000,
    'V': 2_000_000_000,
    'WMT': 2_700_000_000,
  };
  return price * (sharesOutstanding[symbol] || 1_000_000_000);
};
