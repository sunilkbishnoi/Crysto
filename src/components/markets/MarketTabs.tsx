
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useMarketStore } from "@/stores/marketStore";

interface MarketTabsProps {
  children: React.ReactNode;
  defaultValue?: string;
}

export function MarketTabs({ children, defaultValue = "crypto" }: MarketTabsProps) {
  const { activeTab, setActiveTab } = useMarketStore();
  
  // Use the value from the store, or fall back to the defaultValue
  const currentTab = activeTab || defaultValue;

  const handleTabChange = (value: string) => {
    setActiveTab(value as 'crypto' | 'stocks');
  };

  return (
    <Tabs 
      value={currentTab} 
      onValueChange={handleTabChange}
      className="w-full animate-fadeIn"
    >
      <div className="flex justify-center mb-8">
        <TabsList className="h-12 p-1 bg-muted/50 backdrop-blur-sm relative overflow-hidden rounded-md shadow-[0_4px_12px_rgb(0_0_0/0.25)] border border-border/30">
          <div 
            className="absolute h-full bg-primary/10 transition-all duration-300 rounded-md z-0"
            style={{
              width: '50%',
              transform: `translateX(${currentTab === 'crypto' ? '0%' : '100%'})`,
            }}
          />
          <TabsTrigger 
            value="crypto" 
            className={cn(
              "text-lg px-10 py-2 relative z-10 transition-all duration-300",
              "data-[state=active]:text-foreground hover:text-foreground/90",
              "data-[state=active]:font-medium",
              "before:content-[''] before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2",
              "before:w-0 before:h-[2px] before:bg-primary data-[state=active]:before:w-1/2",
              "before:transition-all before:duration-300"
            )}
          >
            Crypto
          </TabsTrigger>
          <TabsTrigger 
            value="stocks" 
            className={cn(
              "text-lg px-10 py-2 relative z-10 transition-all duration-300",
              "data-[state=active]:text-foreground hover:text-foreground/90",
              "data-[state=active]:font-medium",
              "before:content-[''] before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2",
              "before:w-0 before:h-[2px] before:bg-primary data-[state=active]:before:w-1/2",
              "before:transition-all before:duration-300"
            )}
          >
            Stocks
          </TabsTrigger>
        </TabsList>
      </div>
      <div className="animate-fadeIn">
        {children}
      </div>
    </Tabs>
  );
}
