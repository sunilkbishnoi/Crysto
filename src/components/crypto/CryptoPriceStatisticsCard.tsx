
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

interface CryptoPriceStatisticsCardProps {
  volume?: number;
  marketCap?: number;
  circulatingSupply?: number;
  formatCurrency: (value: number) => string;
}

export function CryptoPriceStatisticsCard({
  volume,
  marketCap,
  circulatingSupply,
  formatCurrency
}: CryptoPriceStatisticsCardProps) {
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
              {volume ? volume.toLocaleString() : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Market Cap</span>
            <span className="font-medium">
              {marketCap ? formatCurrency(marketCap) : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Circulating Supply</span>
            <span className="font-medium">
              {circulatingSupply ? circulatingSupply.toLocaleString() : 'N/A'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
