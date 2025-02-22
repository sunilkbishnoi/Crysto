
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface MarketTabsProps {
  children: React.ReactNode;
  defaultValue: string;
}

export function MarketTabs({ children, defaultValue }: MarketTabsProps) {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <div className="flex justify-center mb-8">
        <TabsList className="h-12 p-1 bg-muted/50 backdrop-blur-sm">
          <TabsTrigger 
            value="crypto" 
            className={cn(
              "text-lg px-8 py-2 data-[state=active]:bg-background",
              "data-[state=active]:text-foreground data-[state=active]:shadow-lg"
            )}
          >
            Crypto
          </TabsTrigger>
          <TabsTrigger 
            value="stocks" 
            className={cn(
              "text-lg px-8 py-2 data-[state=active]:bg-background",
              "data-[state=active]:text-foreground data-[state=active]:shadow-lg"
            )}
          >
            Stocks
          </TabsTrigger>
        </TabsList>
      </div>
      {children}
    </Tabs>
  );
}
