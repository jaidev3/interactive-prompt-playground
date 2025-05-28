import React, { useState } from "react";
import type { PromptParameters } from "../types";

interface ParameterControlsProps {
  parameters: PromptParameters;
  setParameters: (params: PromptParameters) => void;
}

const ParameterControls: React.FC<ParameterControlsProps> = ({
  parameters,
  setParameters,
}) => {
  const [stopInput, setStopInput] = useState("");

  const updateParameter = (key: keyof PromptParameters, value: any) => {
    setParameters({
      ...parameters,
      [key]: value,
    });
  };

  const handleStopInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStopInput(e.target.value);
  };

  const addStopSequence = (value: string) => {
    const trimmed = value.trim();
    if (trimmed.length > 0 && !parameters.stopSequence.includes(trimmed)) {
      updateParameter("stopSequence", [...parameters.stopSequence, trimmed]);
    }
  };

  const handleStopInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addStopSequence(stopInput);
      setStopInput("");
    }
  };

  const handleStopInputBlur = () => {
    addStopSequence(stopInput);
    setStopInput("");
  };

  const removeStopSequence = (idx: number) => {
    const newStops = parameters.stopSequence.filter((_, i) => i !== idx);
    updateParameter("stopSequence", newStops);
  };

  return (
    <div className="parameter-controls">
      <h3>⚙️ Parameter Controls</h3>

      <div className="parameter-grid">
        <div className="parameter-group">
          <label htmlFor="model">Model</label>
          <select
            id="model"
            value={parameters.model}
            onChange={(e) =>
              updateParameter(
                "model",
                e.target.value as
                  | "gpt-3.5-turbo"
                  | "gpt-4"
                  | "gpt-4o"
                  | "gpt-4o-mini"
                  | "gpt-4o-2024-08-06"
              )
            }
            className="select-field"
          >
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            <option value="gpt-4">GPT-4</option>
            <option value="gpt-4o">GPT-4o</option>
            <option value="gpt-4o-mini">GPT-4o Mini</option>
            <option value="gpt-4o-2024-08-06">GPT-4o 2024-08-06</option>
          </select>
        </div>

        <div className="parameter-group">
          <label htmlFor="temperature">
            Temperature: {parameters.temperature}
          </label>
          <input
            id="temperature"
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={parameters.temperature}
            onChange={(e) =>
              updateParameter("temperature", parseFloat(e.target.value))
            }
            className="range-field"
          />
          <div className="range-labels">
            <span>Conservative</span>
            <span>Creative</span>
          </div>
        </div>

        <div className="parameter-group">
          <label htmlFor="maxTokens">Max Tokens: {parameters.maxTokens}</label>
          <input
            id="maxTokens"
            type="range"
            min="10"
            max="500"
            step="10"
            value={parameters.maxTokens}
            onChange={(e) =>
              updateParameter("maxTokens", parseInt(e.target.value))
            }
            className="range-field"
          />
          <div className="range-labels">
            <span>Short</span>
            <span>Long</span>
          </div>
        </div>

        <div className="parameter-group">
          <label htmlFor="presencePenalty">
            Presence Penalty: {parameters.presencePenalty}
          </label>
          <input
            id="presencePenalty"
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={parameters.presencePenalty}
            onChange={(e) =>
              updateParameter("presencePenalty", parseFloat(e.target.value))
            }
            className="range-field"
          />
          <div className="range-labels">
            <span>Repetitive</span>
            <span>Novel Topics</span>
          </div>
        </div>

        <div className="parameter-group">
          <label htmlFor="frequencyPenalty">
            Frequency Penalty: {parameters.frequencyPenalty}
          </label>
          <input
            id="frequencyPenalty"
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={parameters.frequencyPenalty}
            onChange={(e) =>
              updateParameter("frequencyPenalty", parseFloat(e.target.value))
            }
            className="range-field"
          />
          <div className="range-labels">
            <span>Repetitive</span>
            <span>Varied Language</span>
          </div>
        </div>

        <div className="parameter-group">
          <label htmlFor="stopSequence">Stop Sequence</label>
          <div className="stop-sequence-chips">
            {parameters.stopSequence.map((seq, idx) => (
              <span key={seq + idx} className="chip">
                {seq}
                <button
                  type="button"
                  className="chip-remove"
                  onClick={() => removeStopSequence(idx)}
                  aria-label={`Remove stop sequence ${seq}`}
                >
                  ×
                </button>
              </span>
            ))}
            <input
              id="stopSequence"
              type="text"
              value={stopInput}
              onChange={handleStopInputChange}
              onKeyDown={handleStopInputKeyDown}
              onBlur={handleStopInputBlur}
              placeholder="Type and press Enter or , to add..."
              className="input-field chip-input"
              style={{
                minWidth: 120,
                flex: 1,
                border: "none",
                outline: "none",
              }}
            />
          </div>
        </div>
      </div>

      <div className="parameter-info">
        <h4>💡 Parameter Guide</h4>
        <ul>
          <li>
            <strong>Temperature:</strong> Controls randomness (0 =
            deterministic, 2 = very random)
          </li>
          <li>
            <strong>Max Tokens:</strong> Maximum length of the response
          </li>
          <li>
            <strong>Presence Penalty:</strong> Encourages new topics (higher =
            more diverse)
          </li>
          <li>
            <strong>Frequency Penalty:</strong> Reduces repetition (higher =
            less repetitive)
          </li>
          <li>
            <strong>Stop Sequence:</strong> Text that stops generation
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ParameterControls;
