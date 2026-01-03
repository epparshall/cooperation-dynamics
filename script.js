// --- Payoff Matrix ---
const payoff = {
	"C,C": [3, 3],
	"D,D": [1, 1],
	"D,C": [5, 0],
	"C,D": [0, 5],
};

// --- Game setup ---
const totalRounds = 10;
let round = 1;
let userScore = 0;
let cpuScore = 0;
let cpu = null;

const log = document.getElementById("log");
const roundInfo = document.getElementById("roundInfo");
const finalScore = document.getElementById("finalScore");
const userScoreDisplay = document.getElementById("userScoreDisplay");
const cpuScoreDisplay = document.getElementById("cpuScoreDisplay");
const cooperateBtn = document.getElementById("cooperate");
const defectBtn = document.getElementById("defect");
const playAgainBtn = document.getElementById("playAgain");

// --- CPU Strategy implementations ---
function alwaysCooperate() {
	return { name: "Always Cooperate", move: () => "C", observe: () => {} };
}

function alwaysDefect() {
	return { name: "Always Defect", move: () => "D", observe: () => {} };
}

function randomStrategy() {
	return {
		name: "Random",
		move: () => (Math.random() < 0.5 ? "C" : "D"),
		observe: () => {},
	};
}

function titForTat() {
	let lastOpponent = "C";
	return {
		name: "Tit for Tat",
		move: () => lastOpponent,
		observe: (oppMove) => {
			lastOpponent = oppMove;
		},
	};
}

function grimTrigger() {
	let betrayed = false;
	return {
		name: "Grim Trigger",
		move: () => (betrayed ? "D" : "C"),
		observe: (oppMove) => {
			if (oppMove === "D") betrayed = true;
		},
	};
}

function pavlov() {
	let lastOutcome = "C";
	return {
		name: "Pavlov",
		move: () => lastOutcome,
		observe: (oppMove, ownMove) => {
			lastOutcome = oppMove === ownMove ? "C" : "D";
		},
	};
}

function titForTatWithNoise(epsilon = 0.1) {
	let lastOpponent = "C";
	return {
		name: "Tit for Tat + Noise",
		move: () =>
			Math.random() < epsilon
				? lastOpponent === "C"
					? "D"
					: "C"
				: lastOpponent,
		observe: (oppMove) => {
			lastOpponent = oppMove;
		},
	};
}

function generousTitForTat() {
	let lastOpponent = "C";
	return {
		name: "Generous Tit for Tat",
		move: () => lastOpponent,
		observe: (oppMove) => {
			lastOpponent = oppMove === "D" && Math.random() < 0.3 ? "C" : oppMove;
		},
	};
}

function suspiciousTitForTat() {
	let first = true;
	let lastOpponent = "C";
	return {
		name: "Suspicious Tit for Tat",
		move: () => {
			if (first) {
				first = false;
				return "D";
			}
			return lastOpponent;
		},
		observe: (oppMove) => {
			lastOpponent = oppMove;
		},
	};
}

// --- Strategy list ---
const strategies = [
	alwaysCooperate,
	alwaysDefect,
	randomStrategy,
	titForTat,
	grimTrigger,
	pavlov,
	titForTatWithNoise,
	generousTitForTat,
	suspiciousTitForTat,
];

// --- Initialize game ---
function initGame() {
	round = 1;
	userScore = 0;
	cpuScore = 0;
	log.innerHTML = "";
	roundInfo.textContent = `Round ${round} of ${totalRounds}`;
	finalScore.style.display = "none";
	playAgainBtn.parentElement.style.display = "none";
	cooperateBtn.disabled = false;
	defectBtn.disabled = false;
	userScoreDisplay.textContent = "0";
	cpuScoreDisplay.textContent = "0";

	// Pick a random CPU strategy
	cpu = strategies[Math.floor(Math.random() * strategies.length)]();
}

// --- Update score displays ---
function updateScores() {
	userScoreDisplay.textContent = userScore;
	cpuScoreDisplay.textContent = cpuScore;

	// Add pulse animation
	userScoreDisplay.style.animation = "none";
	cpuScoreDisplay.style.animation = "none";
	setTimeout(() => {
		userScoreDisplay.style.animation = "pulse 0.3s ease";
		cpuScoreDisplay.style.animation = "pulse 0.3s ease";
	}, 10);
}

// --- Main game logic ---
function playRound(userMove) {
	const cpuMove = cpu.move();

	// Determine payoff
	const key = `${userMove},${cpuMove}`;
	const [uScore, cScore] = payoff[key];
	userScore += uScore;
	cpuScore += cScore;

	// Update score displays
	updateScores();

	// Log round
	const li = document.createElement("li");
	const moveEmoji = {
		C: "🤝",
		D: "⚔️",
	};
	li.innerHTML = `<strong>Round ${round}:</strong> You ${moveEmoji[userMove]} ${userMove}, CPU ${moveEmoji[cpuMove]} ${cpuMove} <span class="round-score">(+${uScore} pts)</span>`;
	log.insertBefore(li, log.firstChild);

	// Update CPU with observation
	if (cpu.observe.length === 2) {
		cpu.observe(userMove, cpuMove);
	} else {
		cpu.observe(userMove);
	}

	round++;

	if (round <= totalRounds) {
		roundInfo.textContent = `Round ${round} of ${totalRounds}`;
	} else {
		endGame();
	}
}

// --- End game ---
function endGame() {
	roundInfo.textContent = "Game Over!";
	cooperateBtn.disabled = true;
	defectBtn.disabled = true;

	// Determine winner
	let result = "";
	let resultClass = "";
	if (userScore > cpuScore) {
		result = "🎉 You Win!";
		resultClass = "win";
	} else if (cpuScore > userScore) {
		result = "😔 CPU Wins!";
		resultClass = "lose";
	} else {
		result = "🤝 It's a Tie!";
		resultClass = "tie";
	}

	finalScore.innerHTML = `
		<div class="result-${resultClass}">${result}</div>
		<div class="final-scores">
			<div>Your Score: <span class="highlight">${userScore}</span></div>
			<div>CPU Score: <span class="highlight">${cpuScore}</span></div>
		</div>
		<div class="strategy-reveal">CPU was using: <strong>${cpu.name}</strong></div>
	`;
	finalScore.style.display = "block";
	playAgainBtn.parentElement.style.display = "block";
}

// --- Hook up buttons ---
cooperateBtn.addEventListener("click", () => playRound("C"));
defectBtn.addEventListener("click", () => playRound("D"));
playAgainBtn.addEventListener("click", initGame);

// --- Start game ---
initGame();
