
import { Coins, BarChart, Activity, TrendingUp } from "lucide-react";
import { MarketOverviewCard } from "./MarketOverviewCard";
import { useMarketData } from "@/services/cryptoApi";
import { AIAnalysisCard } from "./AIAnalysisCard";
import { useQuery } from "@tanstack/react-query";
import { useMarketStore } from "@/stores/marketStore";

interface MarketOverviewProps {
  onAIAnalysis: (type: 'technical' | 'sentiment' | 'prediction' | 'crypto' | 'stock', symbol: string) => void;
}

export function MarketOverview({ onAIAnalysis }: MarketOverviewProps) {
  const { data: cryptoData, isLoading: cryptoLoading } = useMarketData();
  const { currency } = useMarketStore();
  
  // Fetch global market data
  const { data: globalData } = useQuery({
    queryKey: ['globalMarketData'],
    queryFn: async () => {
      const response = await fetch('https://api.coingecko.com/api/v3/global');
      const data = await response.json();
      return data.data;
    },
    refetchInterval: 60000 // Refresh every minute
  });

  // Calculate market metrics
  const btcDominance = globalData?.market_cap_percentage?.btc?.toFixed(1) || '0';
  const ethDominance = globalData?.market_cap_percentage?.eth?.toFixed(1) || '0';
  const totalMarketCap = globalData?.total_market_cap?.usd || 0;
  const total24hVolume = globalData?.total_volume?.usd || 0;
  const marketCapChangePercentage = globalData?.market_cap_change_percentage_24h_usd?.toFixed(1) || '0';
  
  // Format large numbers without currency symbol
  const formatLargeNumber = (num: number) => {
    const value = currency === 'INR' ? num * 83.12 : num;
    if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    return value.toFixed(2);
  };

  if (cryptoLoading) {
    return <div>Loading market data...</div>;
  }

  return (
    <div className="mb-8">
      <div className="relative mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary/80 to-primary/40 text-primary-foreground py-2 px-8 transform skew-x-12 inline-block">
          <span className="transform -skew-x-12 inline-block">Market Overview</span>
        </h2>
        <div className="absolute -bottom-2 right-0 w-16 h-1 bg-primary/70 transform skew-x-12"></div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="animate-fadeIn" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          <MarketOverviewCard
            title="Total Market Cap"
            value={formatLargeNumber(totalMarketCap)}
            change={`${marketCapChangePercentage}% in 24h`}
            Icon={Coins}
            isIncrease={parseFloat(marketCapChangePercentage) > 0}
          />
        </div>
        <div className="animate-fadeIn" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          <MarketOverviewCard
            title="24h Volume"
            value={formatLargeNumber(total24hVolume)}
            change={`${(total24hVolume / totalMarketCap * 100).toFixed(1)}% of Market Cap`}
            Icon={BarChart}
            isIncrease={true}
          />
        </div>
        <div className="animate-fadeIn" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
          <MarketOverviewCard
            title="BTC Dominance"
            value={`${btcDominance}%`}
            change={`ETH: ${ethDominance}%`}
            Icon={TrendingUp}
            isIncrease={parseFloat(btcDominance) > 50}
          />
        </div>
        <div className="animate-fadeIn" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          <MarketOverviewCard
            title="Active Markets"
            value={cryptoData ? cryptoData.length.toString() : "0"}
            change={`${globalData?.active_cryptocurrencies || 0} coins tracked`}
            Icon={Activity}
            isIncrease={true}
          />
        </div>
      </div>
      
      <div className="mt-6 animate-scaleIn" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
        <AIAnalysisCard onAnalysis={onAIAnalysis} />
      </div>
    </div>
  );
}
