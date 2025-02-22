
import { NewsItem } from "@/types/market";

const generateMockStockNews = (count: number): NewsItem[] => {
  const stockCompanies = [
    { symbol: 'AAPL', name: 'Apple' },
    { symbol: 'MSFT', name: 'Microsoft' },
    { symbol: 'GOOGL', name: 'Google' },
    { symbol: 'AMZN', name: 'Amazon' }
  ];

  return stockCompanies.slice(0, count).map((company, index) => ({
    id: `stock-${company.symbol}-${Date.now()}`,
    title: `${company.name} Stock Update: Market Analysis and Future Prospects`,
    description: `Latest market analysis shows promising trends for ${company.name}. Analysts predict strong performance in the coming quarter based on recent developments and market indicators.`,
    url: 'https://example.com/stock-news',
    source: 'Market Watch',
    published_at: new Date(Date.now() - index * 3600000).toISOString(),
    categories: ['Stocks', company.symbol, 'Market Analysis'],
    thumbnail: `https://logo.clearbit.com/${company.name.toLowerCase()}.com`
  }));
};

export const fetchMarketNews = async (): Promise<NewsItem[]> => {
  try {
    const cryptoResponse = await fetch(
      "https://min-api.cryptocompare.com/data/v2/news/?lang=EN&sortOrder=popular&limit=6"
    );
    
    if (!cryptoResponse.ok) {
      throw new Error("Failed to fetch crypto news");
    }
    
    const cryptoData = await cryptoResponse.json();
    
    const cryptoNews = cryptoData.Data.map((item: any) => ({
      id: `crypto-${item.id}`,
      title: item.title,
      description: item.body,
      url: item.url,
      source: item.source,
      published_at: new Date(item.published_on * 1000).toISOString(),
      categories: ["Cryptocurrency", ...item.categories.split('|')],
      thumbnail: item.imageurl,
    }));

    const stockNews = generateMockStockNews(4);

    return [...cryptoNews, ...stockNews].sort((a, b) => 
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    );
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};
