
import { DollarSign, IndianRupee } from "lucide-react";
import { Button } from "../ui/button";
import { useMarketStore } from "@/stores/marketStore";

interface CurrencyToggleProps {
  onCurrencyChange?: (newCurrency: 'INR' | 'USD') => void;
}

export function CurrencyToggle({ onCurrencyChange }: CurrencyToggleProps) {
  const { currency, setCurrency } = useMarketStore();

  const handleCurrencyToggle = () => {
    const newCurrency = currency === "INR" ? "USD" : "INR";
    setCurrency(newCurrency);
    
    // Call the callback if provided
    if (onCurrencyChange) {
      onCurrencyChange(newCurrency);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCurrencyToggle}
      className="flex items-center gap-2 hover:bg-primary/10"
    >
      {currency === "INR" ? (
        <IndianRupee className="h-4 w-4" />
      ) : (
        <DollarSign className="h-4 w-4" />
      )}
      <span>{currency}</span>
    </Button>
  );
}
