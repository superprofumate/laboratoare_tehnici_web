function clearClock(canvas, ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function startClock(canvas, ctx) {
  setInterval(() => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const dayPeriod = hours >= 12 ? 'PM' : 'AM';

    const timeString =
      String(hours % 12 || 12).padStart(2, '0') + ':' +
      String(minutes).padStart(2, '0') + ':' +
      String(seconds).padStart(2, '0') + ' ' +
      dayPeriod;

    clearClock(canvas, ctx);
    ctx.font = "150px digital-clock-font";
    ctx.fillStyle = "#ff2b2b";
    ctx.textBaseline = "top";
    ctx.fillText(timeString, 25, 20);
  }, 1000);
}

async function init() {
  if (document.fonts?.load) {
    await document.fonts.load("75px digital-clock-font");
  }

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  clearClock(canvas, ctx);
  startClock(canvas, ctx);
}

function context() {
  const context = {
    init
  };
  return context;
}

export default context;