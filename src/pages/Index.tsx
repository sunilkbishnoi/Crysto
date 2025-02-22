
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CryptoDetail } from "@/components/CryptoDetail";
import { StockDetail } from "@/components/StockDetail";
import { useMarketData, useStockData } from "@/services/cryptoApi";
import { useToast } from "@/components/ui/use-toast";
import { useMarketStore } from "@/stores/marketStore";
import { Header } from "@/components/markets/Header";
import { MarketOverview } from "@/components/markets/MarketOverview";
import { MarketTabs } from "@/components/markets/MarketTabs";
import { TabsContent } from "@/components/ui/tabs";
import { MarketsList } from "@/components/markets/MarketsList";
import { StocksList } from "@/components/markets/StocksList";

const Index = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [selectedCryptoName, setSelectedCryptoName] = useState<string>("");
  const [selectedStockName, setSelectedStockName] = useState<string>("");
  const { data: cryptoData, isLoading: cryptoLoading } = useMarketData();
  const { data: stockData, isLoading: stockLoading } = useStockData();
  const { toast } = useToast();
  const { currency, setCurrency } = useMarketStore();

  const handleAIAnalysis = (type: 'technical' | 'sentiment' | 'prediction' | 'crypto' | 'stock', symbol: string) => {
    toast({
      title: "AI Analysis Initiated",
      description: `Analyzing ${type === 'crypto' ? 'cryptocurrency' : type === 'stock' ? 'stock' : 'market'} ${symbol === 'global' ? 'trends' : symbol}...`,
      duration: 3000,
    });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const handleCurrencyChange = (newCurrency: 'INR' | 'USD') => {
    setCurrency(newCurrency);
    toast({
      description: `Currency changed to ${newCurrency}`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onCurrencyChange={handleCurrencyChange} />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Header />
        <MarketOverview onAIAnalysis={handleAIAnalysis} />

        {selectedCrypto ? (
          <CryptoDetail
            symbol={selectedCrypto}
            name={selectedCryptoName}
            onBack={() => setSelectedCrypto(null)}
          />
        ) : selectedStock ? (
          <StockDetail
            symbol={selectedStock}
            name={selectedStockName}
            onBack={() => setSelectedStock(null)}
          />
        ) : (
          <MarketTabs defaultValue="crypto">
            <TabsContent value="crypto" className="mt-0">
              <MarketsList
                cryptoData={cryptoData}
                cryptoLoading={cryptoLoading}
                onSelectCrypto={(id, name) => {
                  setSelectedCrypto(id);
                  setSelectedCryptoName(name);
                }}
              />
            </TabsContent>

            <TabsContent value="stocks" className="mt-0">
              <StocksList
                stockData={stockData}
                stockLoading={stockLoading}
                onSelectStock={(id, name) => {
                  setSelectedStock(id);
                  setSelectedStockName(name);
                }}
                formatNumber={formatNumber}
                onAIAnalysis={handleAIAnalysis}
              />
            </TabsContent>
          </MarketTabs>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
