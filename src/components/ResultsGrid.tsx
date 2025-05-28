import React from "react";
import type { ResultData } from "../types";

interface ResultsGridProps {
  results: ResultData[];
  reflection: string;
}

const ResultsGrid: React.FC<ResultsGridProps> = ({ results, reflection }) => {
  if (results.length === 0) {
    return (
      <div className="results-placeholder">
        <h3>📊 Results Grid</h3>
        <div className="empty-state">
          <p>🚀 Click "Run Playground" to start experimenting!</p>
          <p>
            Results will appear here showing how different parameters affect the
            output.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="results-grid">
      <div className="results-header">
        <h3>📊 Experiment Results</h3>
        <div className="results-stats">
          {results.filter((r) => !r.loading && !r.error).length} /{" "}
          {results.length} completed
        </div>
      </div>

      <div className="results-table-container">
        <table className="results-table">
          <thead>
            <tr>
              <th>Temp</th>
              <th>Tokens</th>
              <th>Presence</th>
              <th>Frequency</th>
              <th>Output</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id} className={result.loading ? "loading" : ""}>
                <td className="param-cell temp">
                  {result.parameters.temperature}
                </td>
                <td className="param-cell tokens">
                  {result.parameters.maxTokens}
                </td>
                <td className="param-cell presence">
                  {result.parameters.presencePenalty}
                </td>
                <td className="param-cell frequency">
                  {result.parameters.frequencyPenalty}
                </td>
                <td className="output-cell">
                  {result.loading ? (
                    <div className="loading-indicator">
                      <div className="spinner"></div>
                      <span>Generating...</span>
                    </div>
                  ) : result.error ? (
                    <div className="error-message">❌ {result.error}</div>
                  ) : (
                    <div className="output-text">{result.output}</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="reflection-section">
        <h4>📝 Reflection</h4>
        <div className="reflection-content">
          <p>{reflection}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsGrid;
