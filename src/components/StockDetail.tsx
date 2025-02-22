
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { TradingViewWidget } from "./markets/TradingViewWidget";
import { TimeframeSelector } from "./crypto/TimeframeSelector";
import { StockStats } from "./stock/StockStats";
import { useToast } from "./ui/use-toast";

interface StockDetailProps {
  symbol: string;
  name: string;
  onBack: () => void;
}

export function StockDetail({ symbol, name, onBack }: StockDetailProps) {
  const [timeframe, setTimeframe] = useState(7);
  const { toast } = useToast();

  const handleAIAnalysis = () => {
    toast({
      title: "AI Analysis",
      description: `Analyzing ${name} (${symbol}) data...`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="neo-brutal-button px-4 py-2 rounded-lg flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
        <TimeframeSelector timeframe={timeframe} setTimeframe={setTimeframe} />
      </div>

      <div className="flex flex-col space-y-6">
        <TradingViewWidget symbol={symbol} isStock={true} />
        <StockStats
          timeframe={timeframe}
          currentPrice="Loading..."
          priceChange="Loading..."
          percentage={0}
          lowestPrice="Loading..."
          highestPrice="Loading..."
          isPriceUp={true}
          onAIAnalysis={handleAIAnalysis}
          symbol={symbol}
        />
      </div>
    </div>
  );
}
