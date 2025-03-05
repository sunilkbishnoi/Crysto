
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getAIAnalysis } from "@/services/aiAnalysis";

export function useStockAnalysis(symbol: string) {
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const { toast } = useToast();

  const handleAIAnalysis = async () => {
    try {
      setAnalysisLoading(true);
      const result = await getAIAnalysis(symbol, 'stock');
      setAnalysisResult(result);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to fetch analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAnalysisLoading(false);
    }
  };

  return {
    analysisLoading,
    analysisResult,
    handleAIAnalysis
  };
}
