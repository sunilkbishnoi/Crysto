
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, TrendingUp, MessageCircle, LineChart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTechnicalAnalysis, getSentimentAnalysis, getPricePredictions } from "@/services/cryptoApi";
import { useToast } from "@/components/ui/use-toast";

interface AIAnalysisResultProps {
  type: 'technical' | 'sentiment' | 'prediction';
  symbol: string;
  onBack: () => void;
}

export function AIAnalysisResult({ type, symbol, onBack }: AIAnalysisResultProps) {
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      try {
        let data;
        switch (type) {
          case 'technical':
            data = await getTechnicalAnalysis(symbol);
            break;
          case 'sentiment':
            data = await getSentimentAnalysis(symbol);
            break;
          case 'prediction':
            data = await getPricePredictions(symbol);
            break;
        }
        
        if (data) {
          setAnalysisData(data);
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch analysis data. Please try again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error fetching analysis:', error);
        toast({
          title: "Error",
          description: "An error occurred while fetching the analysis.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [type, symbol, toast]);

  const getAnalysisConfig = () => {
    switch (type) {
      case 'technical':
        return {
          title: "Technical Analysis",
          icon: <LineChart className="h-6 w-6" />,
          data: analysisData ? [
            { label: "Trend", value: analysisData.trend },
            { label: "Support", value: analysisData.support },
            { label: "Resistance", value: analysisData.resistance },
            { label: "RSI", value: analysisData.rsi },
            { label: "MACD", value: analysisData.macd }
          ] : []
        };
      case 'sentiment':
        return {
          title: "Sentiment Analysis",
          icon: <MessageCircle className="h-6 w-6" />,
          data: analysisData ? [
            { label: "Overall Sentiment", value: analysisData.overall },
            { label: "Social Media Score", value: analysisData.socialScore },
            { label: "News Sentiment", value: analysisData.sentiment },
            { label: "Community Outlook", value: analysisData.outlook },
            { label: "Market Fear & Greed", value: analysisData.fearGreed }
          ] : []
        };
      case 'prediction':
        return {
          title: "Price Predictions",
          icon: <TrendingUp className="h-6 w-6" />,
          data: analysisData ? [
            { label: "24h Forecast", value: analysisData.day },
            { label: "7d Forecast", value: analysisData.week },
            { label: "30d Forecast", value: analysisData.month },
            { label: "Confidence Level", value: analysisData.confidence },
            { label: "Volatility Risk", value: analysisData.risk }
          ] : []
        };
      default:
        return {
          title: "Analysis",
          icon: <Brain className="h-6 w-6" />,
          data: []
        };
    }
  };

  const analysis = getAnalysisConfig();

  return (
    <Card className="w-full bg-card text-card-foreground">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <CardTitle className="flex items-center gap-2">
          {analysis.icon}
          {analysis.title} for {symbol}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid gap-6">
            {analysis.data.map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-lg font-medium text-muted-foreground">{item.label}</span>
                <span className="text-lg font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
