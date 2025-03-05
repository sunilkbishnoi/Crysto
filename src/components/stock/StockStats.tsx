
import { useMarketStore } from "@/stores/marketStore";
import { useStockData } from "./useStockData";
import { useStockAnalysis } from "./useStockAnalysis";
import { StockStatisticsCard } from "./StockStatisticsCard";
import { PriceStatisticsCard } from "./PriceStatisticsCard";
import { MarketIndicatorsCard } from "./MarketIndicatorsCard";
import { AIAnalysisCard } from "./AIAnalysisCard";
import { formatCurrency, formatPercentage } from "@/utils/formatters";

interface StockStatsProps {
  timeframe: number;
  currentPrice?: string;
  priceChange?: string;
  percentage?: number;
  lowestPrice?: string;
  highestPrice?: string;
  isPriceUp?: boolean;
  onAIAnalysis?: () => void;
  symbol: string;
}

export function StockStats({
  timeframe,
  symbol,
}: StockStatsProps) {
  const { stats, loading } = useStockData(symbol, timeframe);
  const { analysisLoading, analysisResult, handleAIAnalysis } = useStockAnalysis(symbol);
  const { currency } = useMarketStore();

  const formatCurrencyWithCurrentCurrency = (value: number) => {
    return formatCurrency(value, currency);
  };

  if (loading) {
    return <div>Loading statistics...</div>;
  }

  return (
    <div className="space-y-4">
      {stats && (
        <>
          <StockStatisticsCard
            currentPrice={stats.currentPrice}
            priceChange={stats.priceChange}
            percentageChange={stats.percentageChange}
            lowPrice={stats.lowPrice}
            highPrice={stats.highPrice}
            formatCurrency={formatCurrencyWithCurrentCurrency}
            formatPercentage={formatPercentage}
          />

          <PriceStatisticsCard
            volume={stats.volume}
            marketCap={stats.marketCap}
            peRatio={stats.peRatio}
            formatCurrency={formatCurrencyWithCurrentCurrency}
          />

          <MarketIndicatorsCard
            percentageChange={stats.percentageChange}
          />
        </>
      )}

      <AIAnalysisCard
        symbol={symbol}
        analysisResult={analysisResult}
        isLoading={analysisLoading}
        onAnalyze={handleAIAnalysis}
      />
    </div>
  );
}
