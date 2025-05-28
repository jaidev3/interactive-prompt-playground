export interface PromptParameters {
  model: "gpt-3.5-turbo" | "gpt-4" | "gpt-4o" | "gpt-4o-mini" | "gpt-4o-2024-08-06";
  temperature: number;
  maxTokens: number;
  presencePenalty: number;
  frequencyPenalty: number;
  stopSequence: string[];
}

export interface PromptData {
  systemPrompt: string;
  userPrompt: string;
  parameters: PromptParameters;
}

export interface ResultData {
  id: string;
  parameters: PromptParameters;
  output: string;
  loading: boolean;
  error?: string;
}
