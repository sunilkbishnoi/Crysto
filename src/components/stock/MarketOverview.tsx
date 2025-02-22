
import { Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface MarketOverviewProps {
  marketCap: string;
  volume: string;
  peRatio: number;
  weekRange: {
    low: string;
    high: string;
  };
}

export function MarketOverview({
  marketCap,
  volume,
  peRatio,
  weekRange,
}: MarketOverviewProps) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-[0_8px_16px_rgb(0_0_0/0.1)]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Market Overview</CardTitle>
        <Info className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Market Cap</p>
            <p className="text-lg font-bold">{marketCap}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Volume (24h)</p>
            <p className="text-lg font-bold">{volume}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">P/E Ratio</p>
            <p className="text-lg font-bold">{peRatio}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">52W Range</p>
            <p className="text-lg font-bold">
              {weekRange.low} - {weekRange.high}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
