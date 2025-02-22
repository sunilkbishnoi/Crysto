
interface AIAnalysisResponse {
  outputs?: {
    "out-0": string;
  };
}

export async function getAIAnalysis(symbol: string, type: 'stock' | 'crypto'): Promise<string> {
  const response = await fetch(
    "https://api.stack-ai.com/inference/v0/run/29b2f1c6-2e20-4afb-83c8-afa5afe73a1c/67b85058e1500b3f2d600b8a",
    {
      headers: {
        'Authorization': 'Bearer 59f6ba42-bde8-4bc2-8812-d764fd3eb299',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        "user_id": `${type}_analysis`,
        "in-0": `give analysis of ${symbol} ${type}`
      }),
    }
  );
  
  const result: AIAnalysisResponse = await response.json();
  
  if (!result.outputs || !result.outputs["out-0"]) {
    throw new Error("Invalid API response format");
  }
  
  return result.outputs["out-0"];
}
