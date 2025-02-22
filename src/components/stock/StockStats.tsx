import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Info, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useMarketStore } from "@/stores/marketStore";
import { useToast } from "@/components/ui/use-toast";
import { AIAnalysisCard } from "./AIAnalysisCard";
import { getAIAnalysis } from "@/services/aiAnalysis";

interface StockStatsProps {
  timeframe: number;
  currentPrice: string;
  priceChange: string;
  percentage: number;
  lowestPrice: string;
  highestPrice: string;
  isPriceUp: boolean;
  onAIAnalysis: () => void;
  symbol: string;
}

interface StockStatistics {
  currentPrice: number;
  priceChange: number;
  percentageChange: number;
  lowPrice: number;
  highPrice: number;
  volume: number;
  marketCap: number;
  peRatio: number;
}

export function StockStats({
  timeframe,
  symbol,
}: StockStatsProps) {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const { currency } = useMarketStore();
  const { toast } = useToast();

  useEffect(() => {
    const fetchStockStats = async () => {
      try {
        const interval = 
          timeframe === 1 ? 'TIME_SERIES_DAILY' :
          timeframe === 7 ? 'TIME_SERIES_WEEKLY' :
          'TIME_SERIES_MONTHLY';

        const response = await fetch(
          `https://www.alphavantage.co/query?function=${interval}&symbol=${symbol}&apikey=demo`
        );
        const data = await response.json();

        if (data['Time Series (Daily)'] || data['Weekly Time Series'] || data['Monthly Time Series']) {
          const timeSeries = data['Time Series (Daily)'] || data['Weekly Time Series'] || data['Monthly Time Series'];
          const entries = Object.entries(timeSeries);
          const latestData = entries[0][1];
          const oldestData = entries[Math.min(entries.length - 1, timeframe - 1)][1];

          const currentPrice = parseFloat(latestData['4. close']);
          const oldPrice = parseFloat(oldestData['4. close']);
          const priceChange = currentPrice - oldPrice;
          const percentageChange = (priceChange / oldPrice) * 100;

          setStats({
            currentPrice: currentPrice,
            priceChange: priceChange,
            percentageChange: percentageChange,
            lowPrice: Math.min(...entries.slice(0, timeframe).map(e => parseFloat(e[1]['3. low']))),
            highPrice: Math.max(...entries.slice(0, timeframe).map(e => parseFloat(e[1]['2. high']))),
            volume: parseInt(latestData['5. volume']),
            marketCap: currentPrice * 1000000,
            peRatio: 15.5,
          });
        } else {
          setStats({
            currentPrice: 1000,
            priceChange: 10,
            percentageChange: 1,
            lowPrice: 990,
            highPrice: 1010,
            volume: 100000,
            marketCap: 100000000,
            peRatio: 15.5,
          });
        }
      } catch (error) {
        console.error('Error fetching stock stats:', error);
        setStats({
          currentPrice: 1000,
          priceChange: 10,
          percentageChange: 1,
          lowPrice: 990,
          highPrice: 1010,
          volume: 100000,
          marketCap: 100000000,
          peRatio: 15.5,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStockStats();
    const interval = setInterval(fetchStockStats, 60000);

    return () => clearInterval(interval);
  }, [symbol, timeframe]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 2,
    }).format(currency === 'USD' ? value / 83.12 : value);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const handleAIAnalysis = async () => {
    try {
      setAnalysisLoading(true);
      const result = await getAIAnalysis(symbol, 'stock');
      setAnalysisResult(result);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to fetch analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAnalysisLoading(false);
    }
  };

  if (loading) {
    return <div>Loading statistics...</div>;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Statistics</CardTitle>
          <Info className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Current Price</p>
              <p className="text-lg font-bold">
                {stats ? formatCurrency(stats.currentPrice) : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Price Change</p>
              <p className={`text-lg font-bold ${stats?.percentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {stats ? formatPercentage(stats.percentageChange) : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Day Low</p>
              <p className="text-lg font-bold">
                {stats ? formatCurrency(stats.lowPrice) : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Day High</p>
              <p className="text-lg font-bold">
                {stats ? formatCurrency(stats.highPrice) : 'N/A'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Price Statistics</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Volume</span>
              <span className="font-medium">
                {stats ? stats.volume.toLocaleString() : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Market Cap</span>
              <span className="font-medium">
                {stats ? formatCurrency(stats.marketCap) : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">P/E Ratio</span>
              <span className="font-medium">
                {stats ? stats.peRatio.toFixed(2) : 'N/A'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Market Indicators</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Trend Signal</span>
              <span className={`font-medium ${stats?.percentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {stats?.percentageChange >= 0 ? 'Bullish' : 'Bearish'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Volatility</span>
              <span className="font-medium">
                {stats ? (Math.abs(stats.percentageChange) > 2 ? 'High' : 'Medium') : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Market Phase</span>
              <span className="font-medium">
                {stats?.percentageChange >= 0 ? 'Accumulation' : 'Distribution'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <AIAnalysisCard
        symbol={symbol}
        analysisResult={analysisResult}
        isLoading={analysisLoading}
        onAnalyze={handleAIAnalysis}
      />
    </div>
  );
}
