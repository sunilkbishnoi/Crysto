import { ArrowDown, ArrowUp, Heart, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { useMarketStore } from "@/stores/marketStore";
interface CryptoCardProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  marketCap: number;
  onClick: () => void;
  isLoading?: boolean;
  isFavorite?: boolean;
  onFavoriteClick?: (e: React.MouseEvent) => void;
}
export function CryptoCard({
  symbol,
  name,
  price,
  change,
  marketCap,
  onClick,
  isLoading = false,
  isFavorite = false,
  onFavoriteClick
}: CryptoCardProps) {
  const {
    currency
  } = useMarketStore();
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 2
    }).format(currency === 'USD' ? num : num * 83.12); // Using approximate INR-USD conversion rate
  };
  if (isLoading) {
    return <div className="p-6 rounded-xl border border-border/50 bg-card/50 shadow-[0_8px_16px_rgb(0_0_0/0.1)] backdrop-blur-sm animate-pulse">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="h-6 w-16 bg-muted rounded" />
            <div className="h-4 w-24 bg-muted rounded mt-2" />
          </div>
          <div className="h-6 w-16 bg-muted rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-8 w-32 bg-muted rounded" />
          <div className="h-4 w-48 bg-muted rounded" />
        </div>
      </div>;
  }
  return <div className="relative p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all cursor-pointer shadow-[0_8px_16px_rgb(0_0_0/0.1)]" onClick={onClick}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold">{symbol.toUpperCase()}</h3>
          <p className="text-sm text-muted-foreground">{name}</p>
        </div>
        <div className="flex flex-col gap-2">
          {onFavoriteClick && <button onClick={e => {
          e.stopPropagation();
          onFavoriteClick(e);
        }} className="p-2 hover:bg-muted rounded-full transition-colors">
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
            </button>}
          
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-2xl font-bold">{formatNumber(price)}</p>
        <div className="flex justify-between items-center">
          <div className={`flex items-center ${change >= 0 ? "text-green-500" : "text-red-500"}`}>
            {change >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
            <span className="ml-1">{Math.abs(change).toFixed(2)}%</span>
          </div>
          <p className="text-sm text-muted-foreground">
            MCap: {formatNumber(marketCap)}
          </p>
        </div>
      </div>
    </div>;
}