
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface CryptoMarketIndicatorsCardProps {
  isPriceUp: boolean;
  percentageChange: number;
}

export function CryptoMarketIndicatorsCard({
  isPriceUp,
  percentageChange
}: CryptoMarketIndicatorsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Market Indicators</CardTitle>
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Trend Signal</span>
            <span className={`font-medium ${isPriceUp ? 'text-green-500' : 'text-red-500'}`}>
              {isPriceUp ? 'Bullish' : 'Bearish'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Volatility</span>
            <span className="font-medium">
              {Math.abs(percentageChange) > 2 ? 'High' : 'Medium'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Market Phase</span>
            <span className="font-medium">
              {isPriceUp ? 'Accumulation' : 'Distribution'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
