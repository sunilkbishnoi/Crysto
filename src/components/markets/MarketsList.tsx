
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
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
        : cryptoData?.map((crypto) => (
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
            />
          ))}
    </div>
  );
}
