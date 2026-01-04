const grid = document.getElementById("grid");

let balance = localStorage.getItem("balance")
  ? Number(localStorage.getItem("balance"))
  : 1000;
let bet = 10;
let multiplier = 1;
let opened = 0;
let mines = [];

function startGame() {
  grid.innerHTML = "";
  mines = [];
  multiplier = 1;
  opened = 0;

  while (mines.length < 5) {
    const i = Math.floor(Math.random() * 25);
    if (!mines.includes(i)) mines.push(i);
  }

  for (let i = 0; i < 25; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";

    cell.addEventListener("click", () => onCellClick(cell, i));
    grid.appendChild(cell);
  }
}

function onCellClick(cell, index) {
  if (cell.classList.contains("safe") || cell.classList.contains("mine")) return;

  if (mines.includes(index)) {
    cell.classList.add("mine");
    cell.textContent = "💣";
    balance -= bet;
   function updateBalance() {
  document.getElementById("balance").textContent = balance;
  localStorage.setItem("balance", balance);
}
    alert("💥 Mine! You lost");
    startGame();
  } else {
    cell.classList.add("safe");
    cell.textContent = "⭐";
    opened++;
    multiplier += 0.3;
  }
}

function changeBet(value) {
  if (bet + value > 0 && bet + value <= balance) {
    bet += value;
    document.getElementById("bet").textContent = bet;
  }
}

function cashout() {
  if (opened === 0) return;
  const win = Math.floor(bet * multiplier);
  balance += win;
  updateBalance();
  alert(`💰 You won ${win}`);
  startGame();
}

function updateBalance() {
  document.getElementById("balance").textContent = balance;
}

updateBalance();
startGame();

