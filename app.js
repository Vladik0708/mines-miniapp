if (window.Telegram?.WebApp) {
  Telegram.WebApp.ready();
  Telegram.WebApp.expand();
}

const grid = document.getElementById('grid');
const winText = document.getElementById('win');

const size = 25;
const minesCount = 3;
let mines = [];
let opened = 0;

function generateMines() {
  mines = [];
  while (mines.length < minesCount) {
    const r = Math.floor(Math.random() * size);
    if (!mines.includes(r)) mines.push(r);
  }
}

function createGrid() {
  grid.innerHTML = '';
  opened = 0;
  winText.textContent = '1.00x';
  generateMines();

  for (let i = 0; i < size; i++) {
    const btn = document.createElement('button');
    btn.className = 'cell';

    btn.addEventListener('click', () => openCell(i, btn));
    btn.addEventListener('touchstart', () => openCell(i, btn), { passive: true });

    grid.appendChild(btn);
  }
}

function openCell(i, btn) {
  if (btn.classList.contains('open')) return;
  btn.classList.add('open');

  if (mines.includes(i)) {
    btn.classList.add('mine');
    alert('💥 Mine! You lost');
    revealMines();
  } else {
    btn.classList.add('safe');
    opened++;
    winText.textContent = (1 + opened * 0.2).toFixed(2) + 'x';
  }
}

function revealMines() {
  [...grid.children].forEach((btn, i) => {
    if (mines.includes(i)) {
      btn.classList.add('open', 'mine');
    }
  });
}

function restart() {
  createGrid();
}

createGrid();







