
import { Brain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AIAnalysisForm } from "./AIAnalysisForm";
import { AIAnalysisDisplay } from "./AIAnalysisDisplay";
import { useAIAnalysis } from "@/hooks/useAIAnalysis";

interface AIAnalysisCardProps {
  onAnalysis: (type: 'technical' | 'sentiment' | 'prediction' | 'crypto' | 'stock', symbol: string) => void;
}

export function AIAnalysisCard({ onAnalysis }: AIAnalysisCardProps) {
  const {
    activeAnalysis,
    showSymbolInput,
    analysisResult,
    loading,
    handleSymbolSubmit,
    handleBack,
  } = useAIAnalysis();

  const handleFormSubmit = async (symbol: string) => {
    const result = await handleSymbolSubmit(symbol);
    if (result) {
      onAnalysis('technical', result.symbol);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="w-full hover:shadow-lg transition-shadow">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2">
            <Brain className="w-6 h-6" />
            <CardTitle className="text-2xl font-bold group">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 hover:to-primary transition-colors duration-300">
                Analysis with AI
              </span>
            </CardTitle>
          </div>
          <CardDescription className="mt-2 max-w-4xl mx-auto group">
            <span className="transition-opacity duration-300 group-hover:opacity-90">
              Unlock deep market insights with our AI that analyzes patterns, trends, and market sentiment.
              <br className="my-2" />
              Get real-time predictions and comprehensive analysis for both crypto and stocks.
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          {showSymbolInput ? (
            <AIAnalysisForm onSubmit={handleFormSubmit} />
          ) : (
            <AIAnalysisDisplay 
              symbol={activeAnalysis.symbol}
              analysisResult={analysisResult}
              loading={loading}
              onBack={handleBack}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
