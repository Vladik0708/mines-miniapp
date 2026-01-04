const tg = window.Telegram.WebApp;
tg.expand();

let mines = [];
let opened = [];
let active = false;

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
