
const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export const getSentimentAnalysis = async (symbol: string) => {
  try {
    const response = await fetch(
      `${COINGECKO_API}/coins/${symbol.toLowerCase()}?localization=false&tickers=false&community_data=true&developer_data=false&sparkline=false`
    );
    const data = await response.json();
    
    const sentiment = data.sentiment_votes_up_percentage;
    const score = (sentiment / 100) * 10;
    
    return {
      overall: sentiment > 60 ? "Positive" : sentiment > 40 ? "Neutral" : "Negative",
      socialScore: `${score.toFixed(1)}/10`,
      sentiment: sentiment > 60 ? "Bullish" : sentiment > 40 ? "Neutral" : "Bearish",
      outlook: sentiment > 60 ? "Optimistic" : sentiment > 40 ? "Neutral" : "Cautious",
      fearGreed: `${sentiment.toFixed(0)} (${sentiment > 60 ? "Greed" : sentiment > 40 ? "Neutral" : "Fear"})`
    };
  } catch (error) {
    console.error('Error getting sentiment analysis:', error);
    return null;
  }
};
