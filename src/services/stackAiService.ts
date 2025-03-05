
/**
 * Service for interacting with the Stack AI API
 */

interface StackAIResponse {
  outputs: {
    "out-0": string;
  };
}

export const queryStackAI = async (query: string): Promise<string> => {
  try {
    const response = await fetch(
      "https://api.stack-ai.com/inference/v0/run/29b2f1c6-2e20-4afb-83c8-afa5afe73a1c/67b85058e1500b3f2d600b8a",
      {
        headers: {
          'Authorization': 'Bearer 59f6ba42-bde8-4bc2-8812-d764fd3eb299',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          "user_id": "user_analysis",
          "in-0": query
        }),
      }
    );
    
    const result = await response.json() as StackAIResponse;
    
    if (!result.outputs || !result.outputs["out-0"]) {
      throw new Error("Invalid API response format");
    }
    
    return result.outputs["out-0"];
  } catch (error) {
    console.error('Error querying Stack AI:', error);
    throw new Error('Failed to get AI analysis');
  }
};
