
import { ArrowDown, ArrowUp, Heart } from "lucide-react";
import { useMarketStore } from "@/stores/marketStore";
import { useToast } from "@/components/ui/use-toast";
import { formatCurrency, formatMarketCap } from "@/utils/formatters";

interface StocksListProps {
  stockData: any[];
  stockLoading: boolean;
  onSelectStock: (id: string, name: string) => void;
  formatNumber: (num: number) => string;
  onAIAnalysis: (type: 'stock', symbol: string) => void;
}

export function StocksList({ 
  stockData, 
  stockLoading, 
  onSelectStock,
  formatNumber,
  onAIAnalysis 
}: StocksListProps) {
  const { favorites, addFavorite, removeFavorite, currency } = useMarketStore();
  const { toast } = useToast();

  const handleFavoriteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      removeFavorite(id);
      toast({ description: "Removed from favorites" });
    } else {
      addFavorite(id);
      toast({ description: "Added to favorites" });
    }
  };

  // Take only the first 10 items from stockData
  const limitedStockData = stockData?.slice(0, 10);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary/90 to-primary/50 text-primary-foreground py-2 px-6 transform skew-x-12 inline-block shadow-[3px_3px_0px_rgb(0_0_0/0.3)]">
            <span className="transform -skew-x-12 inline-block">Stock Markets</span>
          </h2>
          <div className="absolute -bottom-2 right-0 w-12 h-1 bg-primary/70 transform skew-x-12"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeIn">
        {stockLoading
          ? Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm animate-pulse">
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
              </div>
            ))
          : limitedStockData?.map((stock, index) => (
              <div
                key={stock.id}
                onClick={() => onSelectStock(stock.id, stock.name)}
                className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all cursor-pointer shadow-[4px_4px_12px_rgb(0_0_0/0.3)] hover:shadow-[6px_6px_16px_rgb(0_0_0/0.35)] hover:-translate-y-1 transform transition-transform duration-300 animate-fade-in dark:hover:bg-card/70 dark:hover:border-border/60 dark:hover:shadow-[6px_6px_16px_rgba(255,255,255,0.07)]"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both'
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold">{stock.symbol.toUpperCase()}</h3>
                    <p className="text-sm text-muted-foreground">{stock.name}</p>
                  </div>
                  <button
                    onClick={(e) => handleFavoriteClick(e, stock.id)}
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                  >
                    <Heart 
                      className={`h-4 w-4 ${favorites.includes(stock.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
                    />
                  </button>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">{formatNumber(stock.current_price)}</p>
                  <div className="flex justify-between items-center">
                    <div className={`flex items-center ${stock.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {stock.price_change_percentage_24h >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                      <span className="ml-1">{Math.abs(stock.price_change_percentage_24h).toFixed(2)}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      MCap: {formatMarketCap(stock.market_cap, currency)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
