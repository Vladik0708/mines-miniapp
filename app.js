const grid = document.getElementById("grid");
const coefEl = document.getElementById("coef");
const balanceEl = document.getElementById("balance");
const winEl = document.getElementById("win");
const mineSelect = document.getElementById("mineSelect");

let mines = 3;
let balance = 1000;
let bet = 10;
let started = false;
let coef = 1;
let gameOver = false;
let minePositions = [];

function setup() {
  grid.innerHTML = "";
  gameOver = false;
  coef = 1;
  coefEl.textContent = coef.toFixed(2);
  winEl.textContent = "0";

  minePositions = [];
  while (minePositions.length < mines) {
    let r = Math.floor(Math.random() * 25);
    if (!minePositions.includes(r)) minePositions.push(r);
  }

  for (let i = 0; i < 25; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.onclick = () => clickCell(cell, i);
    grid.appendChild(cell);
  }
}

function clickCell(cell, index) {
  if (gameOver || cell.classList.contains("star")) return;

  if (minePositions.includes(index)) {
    cell.classList.add("mine");
    cell.textContent = "💣";
    gameOver = true;
    balance -= bet;
    balanceEl.textContent = balance;
    revealMines();
    setTimeout(() => alert("💥 Мина! Вы проиграли"), 300);
  } else {
    cell.classList.add("star");
    cell.textContent = "⭐";
    coef += mines === 10 ? 0.6 : mines === 5 ? 0.4 : 0.3;
    coefEl.textContent = coef.toFixed(2);
    winEl.textContent = Math.floor(bet * coef);
  }
}

function revealMines() {
  document.querySelectorAll(".cell").forEach((c,i)=>{
    if (minePositions.includes(i) && !c.classList.contains("mine")) {
      c.classList.add("mine");
      c.textContent="💣";
    }
  });
}

function cashOut() {
  if (gameOver) return;
  let win = Math.floor(bet * coef);
  balance += win;
  balanceEl.textContent = balance;
  gameOver = true;
  alert("💰 Вы выиграли " + win + " ₽");
}

function restart() {
  started = false;
  setup();
}

function changeMines() {
  mines = Number(mineSelect.value);
  restart();
}
function changeBet(value) {
  if (started) return;

  bet += value;

  if (bet < 10) bet = 10;
  if (bet > balance) bet = balance;

  document.getElementById("bet").textContent = bet;
}
setup();











