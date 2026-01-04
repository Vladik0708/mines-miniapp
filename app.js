const grid = document.querySelector('.grid');
const winEl = document.getElementById('win');
const restartBtn = document.getElementById('restart');

const SIZE = 25;
const MINES = 3;

let mines = [];
let opened = 0;
let multiplier = 1;
let gameOver = false;

restartBtn.onclick = init;

function init() {
  grid.innerHTML = '';
  mines = [];
  opened = 0;
  multiplier = 1;
  gameOver = false;
  winEl.textContent = '1.00x';

  generateMines();

  for (let i = 0; i < SIZE; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.onclick = () => openCell(i, cell);
    grid.appendChild(cell);
  }
}

function generateMines() {
  while (mines.length < MINES) {
    const r = Math.floor(Math.random() * SIZE);
    if (!mines.includes(r)) mines.push(r);
  }
}

function openCell(index, cell) {
  if (gameOver || cell.classList.contains('open')) return;

  cell.classList.add('open');

  if (mines.includes(index)) {
    cell.classList.add('mine');
    cell.textContent = '💣';
    gameOver = true;
    alert('💥 Mine! You lost');
    revealMines();
    return;
  }

  cell.classList.add('star');
  cell.textContent = '⭐';

  opened++;
  multiplier += 0.15;
  winEl.textContent = multiplier.toFixed(2) + 'x';
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




