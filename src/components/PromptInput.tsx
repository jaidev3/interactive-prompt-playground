import React from "react";
import type { PromptData } from "../types";

interface PromptInputProps {
  promptData: PromptData;
  setPromptData: (data: PromptData) => void;
  productItem: string;
  setProductItem: (item: string) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({
  promptData,
  setPromptData,
  productItem,
  setProductItem,
}) => {
  const handleSystemPromptChange = (value: string) => {
    setPromptData({
      ...promptData,
      systemPrompt: value,
    });
  };

  const handleUserPromptChange = (value: string) => {
    setPromptData({
      ...promptData,
      userPrompt: value,
    });
  };

  const suggestedItems = [
    "iPhone 15 Pro",
    "Tesla Model S",
    "Nike Air Jordan",
    "MacBook Pro M3",
    "Sony WH-1000XM5",
    "Dyson V15 Detect",
  ];

  return (
    <div className="prompt-input">
      <h3>📝 Prompt Configuration</h3>

      <div className="input-group">
        <label htmlFor="product-item">Product Item</label>
        <input
          id="product-item"
          type="text"
          value={productItem}
          onChange={(e) => setProductItem(e.target.value)}
          placeholder="Enter product name..."
          className="input-field"
        />
        <div className="suggestions">
          <span>Quick picks:</span>
          {suggestedItems.map((item, index) => (
            <button
              key={index}
              className="suggestion-chip"
              onClick={() => setProductItem(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="system-prompt">System Prompt</label>
        <textarea
          id="system-prompt"
          value={promptData.systemPrompt}
          onChange={(e) => handleSystemPromptChange(e.target.value)}
          placeholder="Enter system prompt..."
          className="textarea-field"
          rows={3}
        />
      </div>

      <div className="input-group">
        <label htmlFor="user-prompt">User Prompt</label>
        <textarea
          id="user-prompt"
          value={promptData.userPrompt}
          onChange={(e) => handleUserPromptChange(e.target.value)}
          placeholder="Enter user prompt (use {item} as placeholder)..."
          className="textarea-field"
          rows={2}
        />
        <small className="helper-text">
          Use <code>{"{item}"}</code> as a placeholder for the product item
        </small>
      </div>
    </div>
  );
};

export default PromptInput;
