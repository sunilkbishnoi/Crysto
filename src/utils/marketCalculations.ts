
/**
 * Utility functions for market-related calculations
 */

export function calculateRSI(prices: number[]): number {
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

export function getRSIInterpretation(rsi: number): string {
  if (rsi > 70) return "Overbought";
  if (rsi < 30) return "Oversold";
  return "Neutral";
}

export function calculateVolatility(prices: number[]): number {
  const returns = [];
  for (let i = 1; i < prices.length; i++) {
    returns.push((prices[i] - prices[i - 1]) / prices[i - 1]);
  }
  
  const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance = returns.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / returns.length;
  return Math.sqrt(variance) * 100;
}
