
import { Landmark, Mail, Phone } from "lucide-react";
import { Button } from "../ui/button";

interface CompanyInfoProps {
  onContactClick: () => void;
}

export function CompanyInfo({ onContactClick }: CompanyInfoProps) {
  return (
    <div className="flex flex-col items-start justify-start space-y-3">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-bold tracking-tight">CryptoMarket</h2>
        <Landmark className="h-5 w-5 text-primary" />
      </div>
      <p className="text-xs text-muted-foreground max-w-xs">
        Real-time cryptocurrency and stock market data, helping you make informed investment decisions.
      </p>
      <Button 
        variant="outline" 
        size="sm"
        className="text-xs h-7 mt-1"
        onClick={onContactClick}
      >
        Contact Us
      </Button>
    </div>
  );
}
