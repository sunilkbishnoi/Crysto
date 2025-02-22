import { Coins, BarChart, Activity } from "lucide-react";
import { MarketOverviewCard } from "./MarketOverviewCard";
import { useMarketData } from "@/services/cryptoApi";
import { AIAnalysisCard } from "./AIAnalysisCard";

interface MarketOverviewProps {
  onAIAnalysis: (type: 'technical' | 'sentiment' | 'prediction' | 'crypto' | 'stock', symbol: string) => void;
}

export function MarketOverview({ onAIAnalysis }: MarketOverviewProps) {
  const { data: cryptoData } = useMarketData();

  // Calculate total market cap
  const totalMarketCap = cryptoData?.reduce((sum, crypto) => sum + crypto.market_cap, 0) || 0;
  
  // Calculate total 24h volume
  const total24hVolume = cryptoData?.reduce((sum, crypto) => sum + crypto.total_volume, 0) || 0;
  
  // Format large numbers
  const formatLargeNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toFixed(2)}`;
  };

  // Calculate percentage changes (mock data for demonstration)
  const marketCapChange = "+5.2%";
  const volumeChange = "+3.8%";
  const pairsChange = "+2.1%";

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
      <MarketOverviewCard
        title="Market Cap"
        value={formatLargeNumber(totalMarketCap)}
        change={`${marketCapChange} in 24h`}
        Icon={Coins}
        isIncrease={true}
      />
      <MarketOverviewCard
        title="24h Volume"
        value={formatLargeNumber(total24hVolume)}
        change={`${volumeChange} vs yesterday`}
        Icon={BarChart}
        isIncrease={true}
      />
      <MarketOverviewCard
        title="Active Pairs"
        value={cryptoData ? cryptoData.length.toString() : "0"}
        change={`${pairsChange} new pairs added`}
        Icon={Activity}
        isIncrease={true}
      />
      <div className="md:col-span-2 lg:col-span-3">
        <AIAnalysisCard onAnalysis={onAIAnalysis} />
      </div>
    </div>
  );
}
