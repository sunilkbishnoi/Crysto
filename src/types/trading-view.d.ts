
interface TradingViewWidget {
  widget: (config: {
    autosize: boolean;
    symbol: string;
    interval: string;
    timezone: string;
    theme: string;
    style: string;
    locale: string;
    toolbar_bg: string;
    enable_publishing: boolean;
    allow_symbol_change: boolean;
    container_id: string;
  }) => void;
}

declare global {
  interface Window {
    TradingView: TradingViewWidget;
  }
}

export {};
