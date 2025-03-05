
import { CryptoCard } from "@/components/CryptoCard";
import { useMarketStore } from "@/stores/marketStore";
import { useToast } from "@/components/ui/use-toast";

interface MarketsListProps {
  cryptoData: any[];
  cryptoLoading: boolean;
  onSelectCrypto: (id: string, name: string) => void;
}

export function MarketsList({ cryptoData, cryptoLoading, onSelectCrypto }: MarketsListProps) {
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

  // Take only the first 10 items from cryptoData
  const limitedCryptoData = cryptoData?.slice(0, 10);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary/90 to-primary/50 text-primary-foreground py-2 px-6 transform skew-x-12 inline-block shadow-[3px_3px_0px_rgb(0_0_0/0.3)]">
            <span className="transform -skew-x-12 inline-block">Crypto Markets</span>
          </h2>
          <div className="absolute -bottom-2 right-0 w-12 h-1 bg-primary/70 transform skew-x-12"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeIn">
        {cryptoLoading
          ? Array.from({ length: 9 }).map((_, i) => (
              <CryptoCard
                key={i}
                symbol=""
                name=""
                price={0}
                change={0}
                marketCap={0}
                onClick={() => {}}
                isLoading
              />
            ))
          : limitedCryptoData?.map((crypto, index) => (
              <CryptoCard
                key={crypto.id}
                symbol={crypto.symbol}
                name={crypto.name}
                price={crypto.current_price}
                change={crypto.price_change_percentage_24h}
                marketCap={crypto.market_cap}
                onClick={() => onSelectCrypto(crypto.id, crypto.name)}
                isFavorite={favorites.includes(crypto.id)}
                onFavoriteClick={(e) => handleFavoriteClick(e, crypto.id)}
                animationDelay={index * 0.1}
              />
            ))}
      </div>
    </div>
  );
}
