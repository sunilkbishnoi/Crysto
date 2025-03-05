
/**
 * This file consolidates and re-exports all crypto and stock API functions
 */

// Re-export all services
export { 
  useMarketData,
  fetchCryptoData
} from './cryptoDataService';

export {
  useStockData,
  fetchStockData
} from './stockDataService';

export { getTechnicalAnalysis } from './technicalAnalysisService';
export { getSentimentAnalysis } from './sentimentAnalysisService';
export { getPricePredictions } from './pricePredictionService';
export { queryStackAI } from './stackAiService';

