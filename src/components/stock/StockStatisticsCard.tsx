
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

interface StockStatisticsCardProps {
  currentPrice: number | string;
  priceChange: number;
  percentageChange: number;
  lowPrice: number | string;
  highPrice: number | string;
  formatCurrency: (value: number) => string;
  formatPercentage: (value: number) => string;
  loading?: boolean;
}

export function StockStatisticsCard({
  currentPrice,
  priceChange,
  percentageChange,
  lowPrice,
  highPrice,
  formatCurrency,
  formatPercentage,
  loading = false
}: StockStatisticsCardProps) {
  if (loading) {
    return <div>Loading statistics...</div>;
  }

  return (
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
              {typeof currentPrice === 'number' ? formatCurrency(currentPrice) : currentPrice}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Price Change</p>
            <p className={`text-lg font-bold ${percentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {formatPercentage(percentageChange)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Day Low</p>
            <p className="text-lg font-bold">
              {typeof lowPrice === 'number' ? formatCurrency(lowPrice) : lowPrice}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Day High</p>
            <p className="text-lg font-bold">
              {typeof highPrice === 'number' ? formatCurrency(highPrice) : highPrice}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
