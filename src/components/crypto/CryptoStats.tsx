
import { useMarketStore } from "@/stores/marketStore";
import { useCryptoData } from "./useCryptoData";
import { useCryptoAnalysis } from "./useCryptoAnalysis";
import { CryptoStatisticsCard } from "./CryptoStatisticsCard";
import { CryptoPriceStatisticsCard } from "./CryptoPriceStatisticsCard";
import { CryptoMarketIndicatorsCard } from "./CryptoMarketIndicatorsCard";
import { AIAnalysisCard } from "../stock/AIAnalysisCard";
import { formatCurrency } from "@/utils/formatters";
import { Button } from "@/components/ui/button";

interface CryptoStatsProps {
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

export function CryptoStats({
  timeframe,
  symbol,
}: CryptoStatsProps) {
  const { stats, loading } = useCryptoData(symbol, timeframe);
  const { analysisLoading, analysisResult, handleAIAnalysis } = useCryptoAnalysis(symbol);
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
          <CryptoStatisticsCard
            currentPrice={stats.currentPrice}
            priceChange={stats.priceChange}
            percentageChange={stats.percentageChange}
            lowestPrice={stats.lowestPrice}
            highestPrice={stats.highestPrice}
            formatCurrency={formatCurrencyWithCurrentCurrency}
            isPriceUp={stats.isPriceUp}
          />

          <CryptoPriceStatisticsCard
            volume={stats.volume}
            marketCap={stats.marketCap}
            circulatingSupply={stats.circulatingSupply}
            formatCurrency={formatCurrencyWithCurrentCurrency}
          />

          <CryptoMarketIndicatorsCard
            isPriceUp={stats.isPriceUp}
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
