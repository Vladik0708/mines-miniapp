const grid = document.getElementById("grid");
let minesCount = 3;
let balance = localStorage.getItem("balance")
  ? Number(localStorage.getItem("balance"))
  : 1000;
let bet = 10;
let multiplier = 1,0 ;
let opened = 0;
let mines = [];

function startGame() {
  grid.innerHTML = "";
  mines = [];
  multiplier = 1;
  opened = 0;

  while (mines.length < minesCount) {
    const i = Math.floor(Math.random() * 25);
    if (!mines.includes(i)) mines.push(i);
  }

  for (let i = 0; i < 25; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.mine = "false";

    cell.addEventListener("click", () => onCellClick(cell, i));
    grid.appendChild(cell);
    if (cell.dataset.mine === "true") {
    cell.classList.add("mine");
    showAllMines();
    alert("💥 Mine! You lost");
    return;
  }
}

function onCellClick(cell, index) {
  if (cell.classList.contains("safe") || cell.classList.contains("mine")) return;

  if (mines.includes(index)) {
    cell.classList.add("mine");
    cell.textContent = "💣";
    cell.style.pointerEvents = "none";
    balance -= bet;
   function updateBalance() {
  document.getElementById("multiplier").textContent = multiplier ;
  localStorage.setItem("balance", balance);
}
    alert("💥 Mine! You lost");
    startGame();
  } else {
    cell.classList.add("safe");
    cell.textContent = "⭐";
  opened++;
multiplier = calculateMultiplier(opened, minesCount);
  }
}

function changeBet(value) {
  if (bet + value > 0 && bet + value <= balance) {
    bet += value;
    document.getElementById("multiplier").textContent = "1.00" ;
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

function setMines(count) {
  minesCount = count;

  document.querySelectorAll(".mines button").forEach(btn =>
    btn.classList.remove("active")
  );

  event.target.classList.add("active");
  startGame();
}
function calculateMultiplier(opened, minesCount) {
  const totalCells = 25;
  let multiplier = 1;

  for (let i = 0; i < opened; i++) {
    multiplier *= totalCells / (totalCells - minesCount - i);
  }

  return multiplier.toFixed(2);
}
let cells = document.querySelectorAll(".cell");
let minesPlaced = 0;

while (minesPlaced < minesCount) {
    let index = Math.floor(Math.random() * cells.length);
    if (cells[index].dataset.mine === "false") {
        cells[index].dataset.mine = "true";
        minesPlaced++;
    }
}
function showAllMines() {
    document.querySelectorAll(".cell").forEach(c => {
        if (c.dataset.mine === "true") {
            c.classList.add("mine");
        }
    });
}

