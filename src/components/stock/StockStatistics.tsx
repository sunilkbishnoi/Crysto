
import { Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface StockStatisticsProps {
  timeframe: number;
  currentPrice: string;
  priceChange: string;
  percentage: number;
  lowestPrice: string;
  highestPrice: string;
  isPriceUp: boolean;
}

export function StockStatistics({
  timeframe,
  currentPrice,
  priceChange,
  percentage,
  lowestPrice,
  highestPrice,
  isPriceUp,
}: StockStatisticsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          {timeframe}D Statistics
        </CardTitle>
        <Info className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Current Price</p>
            <p className="text-lg font-bold">{currentPrice}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Price Change</p>
            <p className={`text-lg font-bold ${isPriceUp ? 'text-green-500' : 'text-red-500'}`}>
              {priceChange} ({percentage.toFixed(2)}%)
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Lowest Price</p>
            <p className="text-lg font-bold">{lowestPrice}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Highest Price</p>
            <p className="text-lg font-bold">{highestPrice}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
