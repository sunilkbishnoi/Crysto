
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

interface CryptoStatisticsCardProps {
  currentPrice: number | string;
  priceChange: number | string;
  percentageChange: number;
  lowestPrice: number | string;
  highestPrice: number | string;
  formatCurrency: (value: number) => string;
  isPriceUp: boolean;
  loading?: boolean;
}

export function CryptoStatisticsCard({
  currentPrice,
  priceChange,
  percentageChange,
  lowestPrice,
  highestPrice,
  formatCurrency,
  isPriceUp,
  loading = false
}: CryptoStatisticsCardProps) {
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
            <p className={`text-lg font-bold ${isPriceUp ? 'text-green-500' : 'text-red-500'}`}>
              {typeof percentageChange === 'number' ? `${percentageChange.toFixed(2)}%` : percentageChange}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Lowest Price</p>
            <p className="text-lg font-bold">
              {typeof lowestPrice === 'number' ? formatCurrency(lowestPrice) : lowestPrice}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Highest Price</p>
            <p className="text-lg font-bold">
              {typeof highestPrice === 'number' ? formatCurrency(highestPrice) : highestPrice}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
