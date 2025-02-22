
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MarketOverviewCardProps {
  title: string;
  value: string;
  change: string;
  Icon: LucideIcon;
  isIncrease?: boolean;
}

export function MarketOverviewCard({ 
  title, 
  value, 
  change, 
  Icon,
  isIncrease 
}: MarketOverviewCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:bg-card/80">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold text-primary">
          {title}
        </CardTitle>
        <Icon className={cn(
          "h-5 w-5",
          isIncrease ? "text-green-500" : "text-muted-foreground"
        )} />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-primary">
          {value}
        </div>
        <p className={cn(
          "text-sm mt-1",
          isIncrease ? "text-green-500" : "text-muted-foreground"
        )}>
          {change}
        </p>
      </CardContent>
    </Card>
  );
}
