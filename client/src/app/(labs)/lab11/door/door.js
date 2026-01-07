const RED = "#ff0000ff";
const WHITE = "#ffffff";
const BLACK = "#000000";

function clearCanvas() {
  const canvas = document.getElementById("canvdoor");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBackground(canvas, ctx, color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawDoorFrame(ctx, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 10;
  ctx.strokeRect(100, 40, 300, 420);
  ctx.strokeLine;
}

function drawDoorSill(ctx, color) {
  ctx.fillStyle = color;
  ctx.fillRect(105, 455, 290, 10);
}

function drawDoor(ctx, color, x1 = 110, y1 = 50, x2 = 330, y2 = 495, deviation = 30) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x1, y1);   // stânga sus
  ctx.lineTo(x2, y1 - deviation);  // dreapta sus
  ctx.lineTo(x2, y2); // dreapta jos
  ctx.lineTo(x1, y2 - deviation);  // stânga jos
  ctx.closePath();
  ctx.fill();
}

function drawDoorUpperBorder(ctx, color, x1 = 110, y1 = 50, x2 = 330, deviation = 30) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y1 - deviation);
  ctx.stroke();
}

function drawDoorRightBorder(ctx, color, y1 = 50, x2 = 330, y2 = 495, deviation = 30) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(x2, y1 - deviation);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function drawDoorHandle(ctx, color, y1 = 50, x2 = 330, y2 = 495, deviation = 30) {
  const rx = 10; // raza orizontală
  const ry = 10; // raza verticală
  const proportionateDeviation = deviation * 10 / 515;
  const rotation = 0; // rotația elipsei în radiani
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x2 - proportionateDeviation - 20, (y1 + proportionateDeviation + y2) / 2, rx, ry + proportionateDeviation * 8, rotation, 0, Math.PI * 2);
  ctx.fill();
}

function drawStatic(color = RED, canvas, ctx) {
  drawBackground(canvas, ctx, WHITE);
  drawDoorFrame(ctx, color);
  drawDoorSill(ctx, WHITE);
}

function drawDinamic(ctx, color = RED, x1 = 110, y1 = 50, x2 = 330, y2 = 495, deviation = 30) {
  drawDoor(ctx, color, x1, y1, x2, y2, deviation);
  drawDoorUpperBorder(ctx, WHITE, x1, y1, x2, deviation);
  drawDoorRightBorder(ctx, WHITE, x2, y1, y2, deviation);
  drawDoorHandle(ctx, WHITE, y1, x2, y2, deviation);
}

function draw(color = RED, x1 = 110, y1 = 50, x2 = 330, y2 = 495, deviation = 30) {
  const canvas = document.getElementById("canvdoor");
  const ctx = canvas.getContext("2d");

  clearCanvas();
  drawStatic(RED, canvas, ctx);
  drawDinamic(ctx, color, x1, y1, x2, y2, deviation);
}

function pointerOnDoor(e) {
  const c = document.getElementById("canvdoor");
  const r = c.getBoundingClientRect();
  const x = e.clientX - r.left;
  const y = e.clientY - r.top;
  c.style.cursor = (x >= 110 && x <= 330 && y >= 20 && y <= 495) ? "pointer" : "default";
}

function validateClick(e) {
  const c = document.getElementById("canvdoor");
  const r = c.getBoundingClientRect();
  const x = e.clientX - r.left;
  const y = e.clientY - r.top;

  if (x < 110 || x > 330 || y < 20 || y > 495) {
    return false;
  }

  return true;
}

function toogleDoorPosition(doorState, onDone) {
  let dt = 0;
  const doorWidth = doorState.value === 0 ? 330 : 390;
  const doorHeight = doorState.value === 0 ? 495 : 465;
  const step = doorState.value === 0 ? 1 : -1;
  const deviation = doorState.value === 0 ? 30 : 0;

  const id = setInterval(() => {
    if (dt < -30 || dt > 30) {
      dt = dt - step;
      const color = doorState.value === 0 ? BLACK : RED;
      draw(color, 110, 50, doorWidth + dt * 2, doorHeight - dt, deviation - dt);

      clearInterval(id);
      doorState.value = doorState.value === 0 ? 1 : 0;
      onDone?.();
    }
    else {
      draw(RED, 110, 50, doorWidth + dt * 2, doorHeight - dt, deviation - dt);
      dt = dt + step;
    }
  }, 16);
}

function init() {
  draw();

  const doorState = { value: 0 };
  let loading = false;

  const canvas = document.getElementById("canvdoor");

  canvas.addEventListener("mousemove", pointerOnDoor);

  canvas.addEventListener("click", (e) => {
    if (!validateClick(e)) return;
    if (loading) return;

    loading = true;
    toogleDoorPosition(doorState, () => {
      loading = false;
    });
  });
}

function context() {
  const context = {
    init,
    draw
  };

  return context;
}

export default context;