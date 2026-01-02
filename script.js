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
const log = document.getElementById("log");
const roundInfo = document.getElementById("roundInfo");
const finalScore = document.getElementById("finalScore");

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
	let lastOutcome = "C"; // "C" = cooperated last round, "D" = defected
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

// --- Pick a random CPU strategy ---
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

const cpu = strategies[Math.floor(Math.random() * strategies.length)]();

// --- Main game logic ---
function playRound(userMove) {
	const cpuMove = cpu.move();

	// Determine payoff
	const key = `${userMove},${cpuMove}`;
	const [uScore, cScore] = payoff[key];
	userScore += uScore;
	cpuScore += cScore;

	// Log round
	const li = document.createElement("li");
	li.textContent = `Round ${round}: You chose ${userMove}, CPU chose ${cpuMove}. Scores: You ${userScore} - CPU ${cpuScore}`;
	log.appendChild(li);

	// Update CPU with observation
	if (cpu.observe.length === 2) {
		cpu.observe(cpuMove, userMove); // For Pavlov which needs both
	} else {
		cpu.observe(cpuMove);
	}

	round++;
	if (round <= totalRounds) {
		roundInfo.textContent = `Round ${round} of ${totalRounds}`;
	} else {
		roundInfo.textContent = "Game Over!";
		finalScore.textContent = `Final Score: You ${userScore} - CPU ${cpuScore}`;
		document.getElementById("cooperate").disabled = true;
		document.getElementById("defect").disabled = true;
	}
}

// --- Hook up buttons ---
document
	.getElementById("cooperate")
	.addEventListener("click", () => playRound("C"));
document
	.getElementById("defect")
	.addEventListener("click", () => playRound("D"));
