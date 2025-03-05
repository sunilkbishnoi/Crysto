
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

interface PriceStatisticsCardProps {
  volume: number;
  marketCap: number;
  peRatio: number;
  formatCurrency: (value: number) => string;
}

export function PriceStatisticsCard({
  volume,
  marketCap,
  peRatio,
  formatCurrency
}: PriceStatisticsCardProps) {
  return (
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
              {volume.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Market Cap</span>
            <span className="font-medium">
              {formatCurrency(marketCap)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">P/E Ratio</span>
            <span className="font-medium">
              {peRatio.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
