const tg = window.Telegram.WebApp;
tg.expand();

let balance = 1000;
let bet = 10;
let multiplier = 1;
let opened = 0;

function startGame(count) {
  opened = [];
  mines = [];
  active = true;
  document.getElementById("cashout").hidden = false;

  while (mines.length < count) {
    let r = Math.floor(Math.random() * 25);
    if (!mines.includes(r)) mines.push(r);
  }

  render();
}

function render() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  for (let i = 0; i < 25; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    if (opened.includes(i)) cell.classList.add("safe");
    cell.onclick = () => clickCell(i);
    grid.appendChild(cell);
  }
}

function clickCell(i) {
  if (!active || opened.includes(i)) return;

  if (mines.includes(i)) {
    revealMines();
    alert("💣 Game Over");
    active = false;
    return;
  }

  opened.push(i);
  render();
}

function revealMines() {
  const grid = document.getElementById("grid").children;
  mines.forEach(i => {
    grid[i].classList.add("mine");
    grid[i].innerHTML = "💣";
  });
}

function cashout() {
  if (!active) return;
  const coef = (1.2 ** opened.length).toFixed(2);
  alert("💰 Cashout x" + coef);
  active = false;
}

function changeBet(value) {
  if (bet + value > 0 && bet + value <= balance) {
    bet += value;
    document.getElementById("bet").textContent = bet;
  }
}

function cashout() {
  const win = Math.floor(bet * multiplier);
  balance += win;
  updateBalance();
  alert(`💰 You won ${win}`);
  resetGame();
}

function updateBalance() {
  document.getElementById("balance").textContent = balance;
}
