const BLACK = "#000";
const YELLOW = "#ffc037ff";

function drawPacman(x, y, r, mouthOpen = 0.01) {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = BLACK;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // cat se taie sus
  const start = mouthOpen / 7 * Math.PI;
  // cat se taie jos
  const end = (2 - mouthOpen / 7) * Math.PI;

  // cap
  ctx.fillStyle = YELLOW;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.arc(x, y, r, start, end, false);
  ctx.closePath();
  ctx.fill();

  // ochi
  ctx.fillStyle = BLACK;
  ctx.beginPath();
  ctx.arc(x + r * 0.15, y - r * 0.6, r * 0.08, 0, Math.PI * 2);
  ctx.fill();
}

function goPacMan(currentInterval, mouthOpen) {
  if(currentInterval.id !== null)
    return;

  const id = setInterval(() => {
    if (mouthOpen.value <= 0.01)
      mouthOpen.direction = 1;
    else if (mouthOpen.value >= 0.99)
      mouthOpen.direction = -1;

    mouthOpen.value += 0.027 * mouthOpen.direction;
    drawPacman(250, 250, 160, mouthOpen.value);
  }, 10);

  currentInterval.id = id;
}

function stopPacMan(currentInterval) {
  if(currentInterval.id === null)
    return;

  clearInterval(currentInterval.id);
  currentInterval.id = null;
}

function init() {
  // direction = -1 inseamna ca inchide gura
  const mouthOpen = { value: 1, direction: 1 };
  const currentInterval = { id: null };

  drawPacman(250, 250, 160, mouthOpen.value);
  document.addEventListener("keydown", () => goPacMan(currentInterval, mouthOpen));
  document.addEventListener("keyup", () => stopPacMan(currentInterval));
}

function context() {
  const context = {
    init
  };
  return context;
}

export default context;