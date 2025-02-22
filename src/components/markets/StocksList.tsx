
import { ArrowDown, ArrowUp, Heart } from "lucide-react";
import { useMarketStore } from "@/stores/marketStore";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

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
  const { favorites, addFavorite, removeFavorite } = useMarketStore();
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {stockLoading
        ? Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-[4px_4px_12px_rgb(0_0_0/0.3)] animate-pulse">
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
        : stockData?.map((stock) => (
            <div
              key={stock.id}
              onClick={() => onSelectStock(stock.id, stock.name)}
              className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all cursor-pointer shadow-[4px_4px_12px_rgb(0_0_0/0.3)] hover:shadow-[6px_6px_16px_rgb(0_0_0/0.35)]"
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
                    MCap: {formatNumber(stock.market_cap)}
                  </p>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
}
