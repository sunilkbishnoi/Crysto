
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface MarketIndicatorsCardProps {
  percentageChange: number;
}

export function MarketIndicatorsCard({
  percentageChange
}: MarketIndicatorsCardProps) {
  const isPositive = percentageChange >= 0;
  
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
            <span className={`font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isPositive ? 'Bullish' : 'Bearish'}
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
              {isPositive ? 'Accumulation' : 'Distribution'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
