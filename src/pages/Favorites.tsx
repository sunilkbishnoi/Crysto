
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useMarketData, useStockData } from "@/services/cryptoApi";
import { useMarketStore } from "@/stores/marketStore";
import { useToast } from "@/components/ui/use-toast";
import { Heart, ArrowUp, ArrowDown } from "lucide-react";

export default function Favorites() {
  const { favorites, removeFavorite, currency } = useMarketStore();
  const { data: cryptoData, isLoading: cryptoLoading } = useMarketData();
  const { data: stockData, isLoading: stockLoading } = useStockData();
  const { toast } = useToast();

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const favoriteItems = [
    ...(cryptoData?.filter((crypto) => favorites.includes(crypto.id)) || []),
    ...(stockData?.filter((stock) => favorites.includes(stock.id)) || []),
  ];

  const handleRemoveFavorite = (id: string, name: string) => {
    removeFavorite(id);
    toast({
      description: `${name} removed from favorites`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Your Favorites</h1>
          <p className="text-muted-foreground mt-2">
            Track your favorite cryptocurrencies and stocks
          </p>
        </header>

        {favoriteItems.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground">
              Add some cryptocurrencies or stocks to your favorites to see them here
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteItems.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all shadow-[4px_4px_12px_rgb(0_0_0/0.3)] hover:shadow-[6px_6px_16px_rgb(0_0_0/0.35)]"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold">{item.symbol.toUpperCase()}</h3>
                    <p className="text-sm text-muted-foreground">{item.name}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveFavorite(item.id, item.name)}
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                  >
                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                  </button>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">{formatNumber(item.current_price)}</p>
                  <div className="flex justify-between items-center">
                    <div className={`flex items-center ${item.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {item.price_change_percentage_24h >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                      <span className="ml-1">{Math.abs(item.price_change_percentage_24h).toFixed(2)}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      MCap: {formatNumber(item.market_cap)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
