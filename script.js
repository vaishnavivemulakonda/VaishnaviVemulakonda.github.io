const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("statusText");
const restartBtn = document.getElementById("restartBtn");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let running = true;

let scores = {
  X: 0,
  O: 0
};

const symbols = {
  "X": "🔥",
  "O": "❄️"
};

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function initializeGame() {
  cells.forEach(cell => cell.addEventListener("click", handleCellClick));
  restartBtn.addEventListener("click", restartGame);
  updateScoreboard();
  statusText.textContent = `${symbols[currentPlayer]} Player ${currentPlayer}'s Turn`;
}

function handleCellClick() {
  const index = this.getAttribute("data-index");

  if (board[index] !== "" || !running) return;

  board[index] = currentPlayer;
  this.textContent = symbols[currentPlayer];
  this.classList.add("played");

  checkWinner();
}

function checkWinner() {
  let roundWon = false;

  for (let condition of winPatterns) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `🎉 ${symbols[currentPlayer]} Player ${currentPlayer} Wins!`;
    scores[currentPlayer]++;
    updateScoreboard();
    celebrateConfetti();
    running = false;
  } else if (!board.includes("")) {
    statusText.textContent = "😲 It's a Draw!";
    running = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `${symbols[currentPlayer]} Player ${currentPlayer}'s Turn`;
  }
}

function updateScoreboard() {
  scoreX.textContent = `🔥 X: ${scores.X}`;
  scoreO.textContent = `❄️ O: ${scores.O}`;
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  running = true;
  statusText.textContent = `${symbols[currentPlayer]} Player ${currentPlayer}'s Turn`;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("played");
  });
}

function celebrateConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

initializeGame();
