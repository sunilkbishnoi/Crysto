
import { FormEvent, useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VoiceInput } from "./VoiceInput";
import { useToast } from "@/components/ui/use-toast";

interface AIAnalysisFormProps {
  onSubmit: (symbol: string) => void;
}

export function AIAnalysisForm({ onSubmit }: AIAnalysisFormProps) {
  const [symbol, setSymbol] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (symbol.trim()) {
      onSubmit(symbol.trim());
    }
  };

  const handleVoiceInput = (transcription: string) => {
    // Extract potential symbol from voice input
    const words = transcription.toUpperCase().split(' ');
    const potentialSymbol = words[words.length - 1]; // Take the last word as the symbol
    setSymbol(potentialSymbol);
    toast({
      description: `Voice input received: ${potentialSymbol}`,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-4xl">
      <div className="flex flex-col space-y-2">
        <div className="flex gap-2">
          <Input
            id="symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="Enter Crypto or Stock to Analyze"
            className="flex-1 py-6"
          />
          <VoiceInput onAnalyze={handleVoiceInput} />
          <Button 
            type="submit" 
            className="gap-2 bg-background text-foreground hover:bg-accent border py-6 px-4 neo-brutal-shadow hover:-translate-y-1 transition-transform duration-300"
          >
            <Sparkles className="w-5 h-5" />
            Generate AI Analysis
          </Button>
        </div>
      </div>
    </form>
  );
}
