# Cooperation Dynamics: Prisoner's Dilemma Game

An interactive, browser-based game that teaches game theory concepts through the classic Prisoner's Dilemma. Play 10 rounds against a CPU opponent using various famous strategies.

## 🎮 Live Demo

Visit the live site: [cooperation-dynamics.pages.dev](https://cooperation-dynamics.pages.dev)

## 📖 About

The Prisoner's Dilemma is one of the most famous concepts in game theory, demonstrating why two rational individuals might not cooperate even when it's in their best interest. This game lets you experience these dynamics firsthand by playing against a computer opponent that uses one of nine classic game theory strategies.

## 🧠 CPU Strategies

The computer randomly selects from these famous strategies:

- **Always Cooperate** - A trusting strategy that always cooperates
- **Always Defect** - An aggressive strategy that never cooperates
- **Random** - Makes random choices each round
- **Tit for Tat** - Copies your previous move, starts cooperative
- **Grim Trigger** - Cooperates until you defect, then defects forever
- **Pavlov** - Repeats successful moves, changes after poor outcomes
- **Generous Tit for Tat** - Like Tit for Tat but sometimes forgives defection
- **Suspicious Tit for Tat** - Like Tit for Tat but starts with defection
- **Tit for Tat + Noise** - Tit for Tat with occasional random moves

## 🎯 Game Rules

### Payoff Matrix

| Outcome | You | CPU |
|---------|-----|-----|
| C, C    | 3   | 3   |
| D, D    | 1   | 1   |
| D, C    | 5   | 0   |
| C, D    | 0   | 5   |

- **C = Cooperate**: Work together
- **D = Defect**: Act in self-interest

The goal is to maximize your score over 10 rounds!

## ✨ Features

- 🎨 Modern, colorful UI with gradient designs
- 📱 Fully responsive - works great on mobile and desktop
- 🔄 Play Again functionality with new random CPU strategy
- 📊 Live score tracking with animated updates
- 📝 Detailed round-by-round log with emoji indicators
- 🏆 Winner announcement with strategy reveal
- 🎓 Educational content about game theory

## 🛠️ Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling with gradients, animations, and responsive design
- **Vanilla JavaScript** - Game logic and interactivity
- **Cloudflare Pages** - Hosting and deployment

## 🚀 Getting Started

### Prerequisites

No build tools required! This is a pure static website.

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cooperation-dynamics.git
cd cooperation-dynamics
```

2. Start a local server:
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js
npx http-server
```

3. Open your browser to `http://localhost:8000`

### Deployment

This project is deployed on Cloudflare Pages with automatic deployments from GitHub:

1. Push your code to GitHub
2. Connect your repository to Cloudflare Pages
3. Set build settings:
   - **Framework preset**: None
   - **Build command**: (leave empty)
   - **Build output directory**: `/`
4. Deploy!

Every push to your main branch automatically triggers a new deployment.

## 📁 Project Structure
```
cooperation-dynamics/
├── index.html          # Main game page
├── about.html          # About page with game theory info
├── privacy.html        # Privacy policy for AdSense compliance
├── style.css           # All styles and responsive design
├── script.js           # Game logic and CPU strategies
└── README.md           # This file
```

## 🎓 Educational Use

This game is perfect for:
- Teaching game theory concepts
- Demonstrating strategic thinking
- Understanding cooperation vs. competition
- Economics and psychology courses
- Interactive learning experiences

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

## 🙏 Acknowledgments

- Game theory concepts based on research by Axelrod, Rapoport, and others
- Inspired by the classic iterated prisoner's dilemma tournaments
- Built with modern web technologies for accessibility and education

---

**Enjoy playing and learning about game theory!** 🎮🧠
