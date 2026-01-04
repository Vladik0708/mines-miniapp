let balance = Number(localStorage.getItem('balance')) || 1000;
let bet = 10;
let mineCount = 3;
let coef = 1.00;
let win = 0;

let mines = new Set();
let opened = new Set();
let gameActive = false;

const grid = document.getElementById("grid");

function updateUI() {
  balance = Math.floor(balance);
  document.getElementById("balance").textContent = balance;
  document.getElementById("bet").textContent = bet;
  document.getElementById("coef").textContent = coef.toFixed(2);
  document.getElementById("win").textContent = Math.floor(win);
}

function renderGrid() {
  grid.innerHTML = "";
  for (let i = 0; i < 25; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.onclick = () => openCell(i, cell);
    grid.appendChild(cell);
  }
}

function changeBet(v) {
  if (gameActive) return;
  bet += v;
  if (bet < 10) bet = 10;
  if (bet > balance) bet = balance;
  updateUI();
}

function setMines(v) {
  if (gameActive) return;
  mineCount = v;
}

function startGame() {
  if (gameActive) return;
  if (bet > balance) return alert("Недостаточно средств");

  balance -= bet;
  localStorage.setItem("balance", balance);

  coef = 1.00;
  win = 0;
  mines.clear();
  opened.clear();

  while (mines.size < mineCount) {
    mines.add(Math.floor(Math.random() * 25));
  }

  gameActive = true;
  renderGrid();
  updateUI();
}

function openCell(i, cell) {
  if (!gameActive || opened.has(i)) return;

  if (mines.has(i)) {
    cell.classList.add("mine");
    endGame(false);
    return;
  }

  opened.add(i);
  cell.classList.add("safe");

  coef += mineCount * 0.08;
  win = bet * coef;
  updateUI();
}

function cashOut() {
  if (!gameActive) return;
  balance += Math.floor(win);
  localStorage.setItem("balance", balance);
  endGame(true);
}

function endGame() {
  gameActive = false;
  document.querySelectorAll(".cell").forEach((cell, i) => {
    if (mines.has(i)) cell.classList.add("mine");
  });
}

renderGrid();
updateUI();











