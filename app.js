const grid = document.getElementById("grid");
const coefEl = document.getElementById("coef");
const balanceEl = document.getElementById("balance");

let mines = 3;
let balance = 1000;
let bet = 10;
let coef = 1;
let gameOver = false;
let minePositions = [];

function setup() {
  grid.innerHTML = "";
  gameOver = false;
  coef = 1;
  coefEl.textContent = coef.toFixed(2);

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
    setTimeout(()=>alert("💥 Mine! You lost"),300);
    revealMines();
  } else {
    cell.classList.add("star");
    cell.textContent = "⭐";
    coef += 0.3;
    coefEl.textContent = coef.toFixed(2);
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
  balance += Math.floor(bet * coef);
  balanceEl.textContent = balance;
  gameOver = true;
  alert("💰 You won!");
}

function restart() {
  setup();
}

setup();








