
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    TradingView: any;
  }
}

interface TradingViewWidgetProps {
  symbol: string;
  isStock?: boolean;
}

export function TradingViewWidget({ symbol, isStock = false }: TradingViewWidgetProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!symbol) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;

    // Format symbols for different markets
    const formatSymbol = () => {
      if (isStock) {
        // For Indian stocks, use BSE format
        return `BSE:${symbol}`;
      } else {
        // For crypto, use Coinbase format which has reliable free data
        const cleanSymbol = symbol.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
        return `${cleanSymbol}`;
      }
    };

    const widgetConfig = {
      width: "100%",
      height: "600",
      symbol: formatSymbol(),
      interval: "D",
      timezone: "Asia/Kolkata",
      theme: "dark",
      style: "1",
      locale: "en",
      enable_publishing: false,
      backgroundColor: "#1a1b1e",
      gridColor: "rgba(51, 51, 51, 0.1)",
      allow_symbol_change: true,
      calendar: true,
      support_host: "https://www.tradingview.com"
    };

    script.innerHTML = JSON.stringify(widgetConfig);

    if (container.current) {
      container.current.innerHTML = '';
      container.current.appendChild(script);
    }

    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, [symbol, isStock]);

  if (!symbol) return null;

  return (
    <div 
      ref={container}
      className="h-[600px] w-full rounded-xl border-2 border-border overflow-hidden bg-background"
    />
  );
}
