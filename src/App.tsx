import { useState } from "react";
import ParameterControls from "./components/ParameterControls";
import ResultsGrid from "./components/ResultsGrid";
import PromptInput from "./components/PromptInput";
import OpenAI from "openai";
import type { PromptParameters, PromptData, ResultData } from "./types";
import "./App.css";

const OPENAI_API_KEY = "add your key here";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

function App() {
  const [results, setResults] = useState<ResultData[]>([]);
  const [reflection, setReflection] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [productItem, setProductItem] = useState("iPhone 15 Pro");
  const [promptData, setPromptData] = useState<PromptData>({
    systemPrompt:
      "You are a helpful product description writer. Create compelling, accurate product descriptions.",
    userPrompt: `Write a product description for: ${productItem}`,
    parameters: {
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      maxTokens: 30,
      presencePenalty: 0.0,
      frequencyPenalty: 0.0,
      stopSequence: [],
    },
  });

  async function getReflection() {
    const reflectionPrompt = `
You are evaluating multiple AI-generated product descriptions created using different OpenAI chat parameters.

Each output was generated using different combinations of:
- Temperature
- Max Tokens
- Presence Penalty
- Frequency Penalty
- Model (GPT-3.5 or GPT-4)

Your task is to write a detailed reflection comparing how these parameters affected the outputs.

1. Identify key differences in tone, creativity, completeness, and repetition across the samples.
2. Explain how specific parameter values (e.g., higher temperature or presence penalty) contributed to those differences.
3. Summarize how a user could use these insights to tune the model output for a specific goal (e.g., factual vs. creative, concise vs. detailed).

Write your response in 2 structured paragraphs, using examples if helpful.
`;

    const reflectionResponse = await openai.chat.completions.create({
      model: "gpt-4", // use gpt-4 for best meta-analysis
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant that analyzes and reflects on generated language samples.",
        },
        { role: "user", content: reflectionPrompt },
        {
          role: "user",
          content: `Here are the generated outputs:\n${results
            .map((r) => r.output)
            .join("\n")}`,
        }, // dynamically insert all outputs here
      ],
      temperature: 0.7,
      max_tokens: 400,
    });
    setReflection(reflectionResponse.choices[0]?.message.content || "");
  }

  async function getChatResponse() {
    try {
      const response = await openai.chat.completions.create({
        model: promptData.parameters.model,
        messages: [
          { role: "system", content: promptData.systemPrompt },
          { role: "user", content: promptData.userPrompt },
        ],
        temperature: promptData.parameters.temperature,
        max_tokens: promptData.parameters.maxTokens,
        presence_penalty: promptData.parameters.presencePenalty,
        frequency_penalty: promptData.parameters.frequencyPenalty,
        stop: promptData.parameters.stopSequence,
      });

      const answer = response.choices[0]?.message?.content;
      // console.log("answer", answer, response.choices[0]);
      setResults((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          parameters: promptData.parameters,
          output: answer || "No answer",
          loading: false,
        },
      ]);
      getReflection();
      setIsRunning(false);
    } catch (error) {
      console.error("Error:", error);
      setIsRunning(false);
    }
  }

  const runPlayground = async () => {
    // console.log("Running playground...", promptData);
    setIsRunning(true);
    getChatResponse();
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎮 Interactive Prompt Playground</h1>
        <p>
          Experiment with OpenAI parameters and see how they affect your prompts
        </p>
      </header>

      <div className="app-content">
        <div className="left-panel">
          <PromptInput
            promptData={promptData}
            setPromptData={setPromptData}
            productItem={productItem}
            setProductItem={setProductItem}
          />

          <ParameterControls
            parameters={promptData.parameters}
            setParameters={(params) =>
              setPromptData((prev) => ({ ...prev, parameters: params }))
            }
          />

          <button
            className="run-button"
            onClick={runPlayground}
            disabled={isRunning}
          >
            {isRunning ? "🔄 Running..." : "🚀 Run Playground"}
          </button>
        </div>

        <div className="right-panel">
          <ResultsGrid results={results} reflection={reflection} />
        </div>
      </div>
    </div>
  );
}

export default App;
