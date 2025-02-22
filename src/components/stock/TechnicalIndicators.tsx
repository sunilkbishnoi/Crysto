
import { BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface TechnicalIndicatorsProps {
  rsi: number;
  macd: string;
  movingAverage: string;
}

export function TechnicalIndicators({
  rsi,
  macd,
  movingAverage,
}: TechnicalIndicatorsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Technical Indicators</CardTitle>
        <BarChart3 className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">RSI (14)</span>
            <span className="font-medium">{rsi}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">MACD</span>
            <span className="font-medium text-green-500">{macd}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">20-Day MA</span>
            <span className="font-medium">{movingAverage}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
