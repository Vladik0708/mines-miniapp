if (window.Telegram && window.Telegram.WebApp) {
  Telegram.WebApp.ready();
  Telegram.WebApp.expand();
}
const grid = document.querySelector('.grid');
const winEl = document.getElementById('win');
const restartBtn = document.getElementById('restart');

let cashBtn;

const SIZE = 25;
const MINES = 3;
const BASE_MULTIPLIER = 1.15;

let mines = [];
let opened = 0;
let multiplier = 1;
let gameOver = false;
let cashedOut = false;

restartBtn.onclick = init;

function init() {
  grid.innerHTML = '';
  mines = [];
  opened = 0;
  multiplier = 1;
  gameOver = false;
  cashedOut = false;

  winEl.textContent = '1.00x';

  if (cashBtn) cashBtn.remove();
  createCashOut();

  generateMines();

  for (let i = 0; i < SIZE; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
  cell.addEventListener('touchstart', () => openCell(i, cell), { passive: true });
cell.addEventListener('click', () => openCell(i, cell));
    grid.appendChild(cell);
  }
}

function createCashOut() {
  cashBtn = document.createElement('button');
  cashBtn.textContent = 'Cash Out';
  cashBtn.style.background = '#2ecc71';
  cashBtn.onclick = cashOut;
  document.querySelector('.top').appendChild(cashBtn);
}

function generateMines() {
  while (mines.length < MINES) {
    const r = Math.floor(Math.random() * SIZE);
    if (!mines.includes(r)) mines.push(r);
  }
}

function openCell(index, cell) {
  if (gameOvercell.classList.contains('open')) return;

  cell.classList.add('open');

  if (mines.includes(index)) {
    cell.classList.add('mine');
    cell.textContent = '💣';
    gameOver = true;
    revealMines();
    setTimeout(() => alert('💥 Mine! You lost'), 100);
    return;
  }

  cell.classList.add('star');
  cell.textContent = '⭐';

  opened++;
  multiplier *= BASE_MULTIPLIER;
  winEl.textContent = multiplier.toFixed(2) + 'x';
}

function cashOut() {
  if (gameOver || opened === 0) return;

  cashedOut = true;
  cashBtn.textContent = '✔ Cashed';
  cashBtn.disabled = true;
  cashBtn.style.background = '#888';

  revealMines();
  setTimeout(() => alert(`💰 You won x${multiplier.toFixed(2)}`), 150);
}

function revealMines() {
  document.querySelectorAll('.cell').forEach((cell, i) => {
    if (mines.includes(i)) {
      cell.classList.add('open', 'mine');
      cell.textContent = '💣';
    }
  });
}

init();






