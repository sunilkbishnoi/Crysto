
import { Button } from "@/components/ui/button";

interface TimeframeSelectorProps {
  timeframe: number;
  setTimeframe: (timeframe: number) => void;
}

export function TimeframeSelector({ timeframe, setTimeframe }: TimeframeSelectorProps) {
  return (
    <div className="flex gap-2"></div>
  );
}
