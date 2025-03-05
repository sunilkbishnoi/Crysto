
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { queryStackAI } from "@/services/stackAiService";

export function useAIAnalysis() {
  const [activeAnalysis, setActiveAnalysis] = useState<{
    type: 'technical' | 'sentiment' | 'prediction' | null;
    symbol: string;
  }>({ type: null, symbol: '' });
  const [showSymbolInput, setShowSymbolInput] = useState(true);
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSymbolSubmit = async (symbol: string) => {
    if (symbol) {
      setShowSymbolInput(false);
      setActiveAnalysis({ type: 'technical', symbol: symbol.toUpperCase() });
      try {
        setLoading(true);
        const result = await queryStackAI(`give analysis of ${symbol} stock`);
        setAnalysisResult(result);
        return { type: 'technical' as const, symbol: symbol.toUpperCase() };
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: "Error",
          description: "Failed to fetch analysis. Please try again.",
          variant: "destructive",
        });
        setAnalysisResult("No analysis available");
        return null;
      } finally {
        setLoading(false);
      }
    }
    return null;
  };

  const handleBack = () => {
    setActiveAnalysis({ type: null, symbol: '' });
    setShowSymbolInput(true);
    setAnalysisResult('');
  };

  return {
    activeAnalysis,
    showSymbolInput,
    analysisResult,
    loading,
    handleSymbolSubmit,
    handleBack,
  };
}
