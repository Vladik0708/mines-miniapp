if (window.Telegram && Telegram.WebApp) {
  Telegram.WebApp.expand();
  Telegram.WebApp.disableVerticalSwipes();
}

let balance = Number(localStorage.getItem('balance')) || 1000;
let bet = 10;
let mineCount = 3;
let coef = 1.00;

let mines = new Set();
let opened = new Set();
let gameActive = false;

const grid = document.getElementById("grid");
const winEl = document.getElementById("win");
const winBox = document.querySelector(".win");

function updateUI() {
  document.getElementById("balance").textContent = Math.floor(balance);
  document.getElementById("bet").textContent = bet;
  document.getElementById("coef").textContent = coef.toFixed(2);
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
  opened.clear();
  mines.clear();

  while (mines.size < mineCount) {
    mines.add(Math.floor(Math.random() * 25));
  }

  winEl.textContent = 0;
  gameActive = true;
  renderGrid();
  updateUI();
}

function openCell(i, cell) {
  if (!gameActive || opened.has(i)) return;

  if (mines.has(i)) {
    cell.classList.add("mine");
    endGame();
    return;
  }

  opened.add(i);
  cell.classList.add("safe");

  coef += mineCount * 0.08;
  const profit = bet * coef - bet;

  balance += profit;
  localStorage.setItem("balance", balance);

  winEl.textContent = Math.floor(profit);
  winBox.classList.add("pop");
  setTimeout(() => winBox.classList.remove("pop"), 150);

  updateUI();
}

function cashOut() {
  if (!gameActive) return;
  endGame();
}

function endGame() {
  gameActive = false;
  document.querySelectorAll(".cell").forEach((cell, i) => {
    if (mines.has(i)) cell.classList.add("mine");
  });
}

renderGrid();
updateUI();













