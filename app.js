body {
  background: #0f172a;
  font-family: Arial, sans-serif;
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.game {
  width: 320px;
}

.top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}

.cell {
  width: 55px;
  height: 55px;
  background: #1e293b;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  transition: transform .15s;
}

.cell:hover {
  transform: scale(1.05);
}

.cell.star {
  background: #22c55e;
  box-shadow: 0 0 15px #22c55e;
}

.cell.star::after {
  content: "⭐";
  font-size: 26px;
  position: absolute;
  top: 12px;
  left: 14px;
}

.cell.mine {
  background: #dc2626;
  animation: explode .4s ease-out;
}

.cell.mine::after {
  content: "💣";
  font-size: 26px;
  position: absolute;
  top: 12px;
  left: 14px;
}

@keyframes explode {
  0% { transform: scale(1); }
  40% { transform: scale(1.3); }
  100% { transform: scale(1); }
}

button {
  margin-top: 15px;
  width: 100%;
  padding: 10px;
  background: #2563eb;
  border: none;
  color: white;
  border-radius: 8px;
  font-size: 16px;
}
}


