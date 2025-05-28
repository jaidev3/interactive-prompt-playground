# 🎮 Interactive Prompt Playground

A powerful React-based application for experimenting with OpenAI parameters and understanding how they affect prompt outputs. Built with Vite, TypeScript, and modern UI components.

## ✨ Features

- **Parameter Testing**: Experiment with temperature, max tokens, presence penalty, and frequency penalty
- **Real-time Results**: See how different parameter combinations affect your prompts
- **Beautiful UI**: Modern, responsive design with intuitive controls
- **Product Descriptions**: Pre-configured for testing product description generation
- **Analysis Tools**: Built-in analysis and reflection sections
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd interactive-prompt-playground
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎯 How to Use

### 1. Configure Your Prompt

- Enter a **Product Item** (e.g., iPhone 15 Pro, Tesla Model S)
- Customize the **System Prompt** to define the AI's role
- Set the **User Prompt** with `{item}` as a placeholder

### 2. Adjust Parameters

- **Model**: Choose between GPT-3.5 Turbo or GPT-4
- **Temperature**: Control creativity (0 = conservative, 2 = very creative)
- **Max Tokens**: Set response length (10-500 tokens)
- **Presence Penalty**: Encourage new topics (0-2)
- **Frequency Penalty**: Reduce repetition (0-2)
- **Stop Sequence**: Define text that stops generation

### 3. Run Experiments

Click **"Run Playground"** to test 12 different parameter combinations and see how they affect the output.

### 4. Analyze Results

Review the results grid and built-in analysis to understand parameter effects.

## 📊 Parameter Testing Matrix

The playground automatically tests these combinations:

| Temperature | Max Tokens   | Presence Penalty | Frequency Penalty |
| ----------- | ------------ | ---------------- | ----------------- |
| 0.0         | 50, 150, 300 | 0.0              | 0.0               |
| 0.7         | 50, 150, 300 | 0.0              | 0.0               |
| 1.2         | 50, 150, 300 | 0.0              | 0.0               |
| 0.7         | 150          | 1.5              | 0.0               |
| 0.7         | 150          | 0.0              | 1.5               |
| 0.7         | 150          | 1.5              | 1.5               |

## 🛠️ Built With

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Modern styling with gradients and animations
- **Google Fonts** - Inter font family

## 📱 Responsive Design

The application is fully responsive with breakpoints at:

- Desktop: 1024px+
- Tablet: 768px - 1024px
- Mobile: 320px - 768px

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/
│   ├── ParameterControls.tsx    # Parameter adjustment controls
│   ├── PromptInput.tsx          # Prompt configuration
│   └── ResultsGrid.tsx          # Results display and analysis
├── App.tsx                      # Main application component
├── App.css                      # Application styles
├── index.css                    # Global styles
└── main.tsx                     # Application entry point
```

## 🎨 Design Features

- **Glassmorphism**: Translucent panels with backdrop blur
- **Gradient Backgrounds**: Beautiful purple-blue gradients
- **Smooth Animations**: Hover effects and transitions
- **Color-coded Parameters**: Visual distinction for different parameter types
- **Loading States**: Animated spinners for better UX

## 🧠 Understanding Parameters

### Temperature (0-2)

- **0.0**: Deterministic, consistent outputs
- **0.7**: Balanced creativity and coherence
- **1.2+**: High creativity, more unpredictable

### Max Tokens

- **50**: Concise, essential information
- **150**: Good balance of detail and brevity
- **300+**: Comprehensive, detailed responses

### Presence Penalty (0-2)

- **0.0**: No penalty for introducing new topics
- **1.5+**: Strong encouragement for diverse topics

### Frequency Penalty (0-2)

- **0.0**: No penalty for word repetition
- **1.5+**: Strong penalty reducing repetitive language

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- OpenAI for the powerful language models
- React team for the amazing framework
- Vite team for the fast build tool
- Inter font family by Rasmus Andersson

## 🐛 Known Issues

- API simulation only - replace with actual OpenAI integration for production use
- Limited to predefined parameter combinations
- No user authentication or data persistence

## 🔮 Future Enhancements

- [ ] Real OpenAI API integration
- [ ] Custom parameter combinations
- [ ] Export results to CSV/JSON
- [ ] User accounts and saved experiments
- [ ] More AI models (Claude, Gemini)
- [ ] Batch processing capabilities
- [ ] Advanced analytics and visualizations
