function clearTable() {
  const container = document.getElementById('containerDraw');
  const table = container.querySelector('table');
  const rows = table.querySelectorAll('tr');

  rows.forEach((row) => {
    const cells = row.querySelectorAll('td');
    cells.forEach((cell) => {
      cell.style.backgroundColor = 'whitesmoke';
    });
  });
}

function drawTable(nrows, ncols) {
  const cleanUp = () => {
    const container = document.getElementById('containerDraw');
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  const createElement = (tag, parent) => {
    const elem = document.createElement(tag);
    parent.appendChild(elem);
    return elem;
  };

  const createTable = (nrows, ncols) => {
    const container = document.getElementById('containerDraw');
    const table = createElement('table', container);
    for (let i = 0; i < nrows; i++) {
      const tr = createElement('tr', table);
      for (let j = 0; j < ncols; j++) {
        createElement('td', tr);
      }
    }
  };

  cleanUp();
  createTable(nrows, ncols);
}

function colorCol(column, color) {
  const table = document.querySelector("table");
  const rows = table.querySelectorAll("tr");

  rows.forEach((row) => {
    const cell = row.children[column];
    if (cell) cell.style.backgroundColor = color;
  })
}

function colorRow(row, color) {
  const table = document.querySelector("table");
  const rows = table.querySelectorAll("tr");

  for (const cell of rows[row].children) {
    cell.style.backgroundColor = color;
  }
}

function rainbow(target) {
  const getDimensions = () => {
    const table = document.querySelector("table");
    const rows = table.querySelectorAll("tr");
    const nrows = rows.length;
    const ncols = rows[0].cells.length;
    return { nrows, ncols };
  };

  const { nrows, ncols } = getDimensions();
  const colors = ["rgb(255, 0, 0)", "rgb(255, 154, 0)", "rgb(240, 240, 0)", "rgb(79, 220, 74)", "rgb(63, 218, 216)", "rgb(47, 201, 226)", "rgb(28, 127, 238)", "rgb(95, 21, 242)", "rgb(186, 12, 248)", "rgb(251, 7, 217)"];
  const n = colors.length;

  const isVertical = target === "horizontal";
  const length = isVertical ? nrows : ncols;
  const width = isVertical ? nrows / n : ncols / n;
  const paint = isVertical ? colorRow : colorCol;

  for (let i = 0; i < length; i++) {
    paint(i, colors[Math.floor(i / width)]);
  }
}

function drawPixel(rowIdx, colIdx, color) {
  const rowIdxInt = parseInt(rowIdx);
  const colIdxInt = parseInt(colIdx);

  const container = document.getElementById('containerDraw');
  const table = container.querySelector('table');
  const row = table.querySelectorAll('tr')[rowIdxInt];
  const cell = row.children[colIdxInt];
  cell.style.backgroundColor = color;
}

function drawLine(r1, c1, r2, c2, color) {
  r1 = Number(r1); c1 = Number(c1);
  r2 = Number(r2); c2 = Number(c2);

  if (c1 !== c2 && r1 !== r2) return;

  const startRow = r1 < r2 ? r1 : r2;
  const endRow = r1 + r2 - startRow;
  const startCol = c1 < c2 ? c1 : c2;
  const endCol = c1 + c2 - startCol;

  for (let i = startRow; i <= endRow; i++)
    for (let j = startCol; j <= endCol; j++)
      drawPixel(i, j, color);
}

function drawRect(r1, c1, r2, c2, color) {
  r1 = Number(r1); c1 = Number(c1);
  r2 = Number(r2); c2 = Number(c2);

  const startRow = r1 < r2 ? r1 : r2;
  const endRow = r1 + r2 - startRow;
  const startCol = c1 < c2 ? c1 : c2;
  const endCol = c1 + c2 - startCol;

  if (startRow === endRow || startCol === endCol)
    drawLine(startRow, startCol, endRow, endCol, color);
  else {
    drawLine(startRow, startCol, startRow, endCol, color);
    drawLine(endRow, startCol, endRow, endCol, color);
    drawLine(startRow + 1, startCol, endRow - 1, startCol, color);
    drawLine(startRow + 1, endCol, endRow - 1, endCol, color);
  }
}

function drawPixelExt(row, col, color) {
  const createElement = (tag, parent) => {
    const elem = document.createElement(tag);
    parent.appendChild(elem);
    return elem;
  };

  const container = document.getElementById('containerDraw');
  const table = container.querySelector('table');
  const rows = table.querySelectorAll('tr');
  const nrows = rows.length - 1;
  const ncols = rows[0].children.length - 1;

  row = Number(row);
  col = Number(col);

  if (row > nrows) {
    for (let i = nrows; i < row; i++) {
      const tr = createElement('tr', table);
      for (let j = 0; j <= ncols; j++) {
        createElement('td', tr);
      }
    }
  }

  if (col > ncols) {
    const updatedRows = table.querySelectorAll('tr');
    updatedRows.forEach((r) => {
      for (let j = ncols; j < col; j++) {
        createElement('td', r);
      }
    });
  }

  drawPixel(row, col, color);
}

function colorMixer(colorA, colorB, amount) {
  let cA = colorA * (1 - amount);
  let cB = colorB * (amount);
  return parseInt(cA + cB);
}

function drawPixelAmount(row, col, color, amount) {
  const cssColorToRgb = (color) => {
    const el = document.createElement("div");
    el.style.color = color;
    document.body.appendChild(el);

    const rgb = getComputedStyle(el).color; // ex: "rgb(0, 0, 255)"
    el.remove();
    return rgb;
  }

  if (amount <= 0 || amount > 1)
    return;

  const container = document.getElementById('containerDraw');
  const table = container.querySelector('table');
  const cell = table.querySelectorAll('tr')[row].children[col];
  const cellBgColor = getComputedStyle(cell).backgroundColor;

  const oldColorArray = cellBgColor.match(/\d+/g);
  const newColorArray = cssColorToRgb(color).match(/\d+/g);
  const mixedColorArray = Array.from({ length: 3 }, (_, i) =>
    colorMixer(oldColorArray[i], newColorArray[i], amount)
  );
  const mixedColor = `rgb(${mixedColorArray[0]}, ${mixedColorArray[1]}, ${mixedColorArray[2]})`;

  //drawPixel(row, col, mixedColor);
  cell.style.backgroundColor = mixedColor;
}

function delRow(row) {
  const container = document.getElementById('containerDraw');
  const table = container.querySelector('table');
  const rows = table.querySelectorAll('tr');
  table.removeChild(rows[row]);
}

function delCol(col) {
  const container = document.getElementById('containerDraw');
  const table = container.querySelector('table');
  const rows = table.querySelectorAll('tr');
  rows.forEach(row => {
    row.removeChild(row.children[col]);
  });
}

async function shiftRow(row, pos) {
  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  const container = document.getElementById("containerDraw");
  const table = container.querySelector("table");
  const rows = table.querySelectorAll("tr");
  const tr = rows[row];

  const cells = Array.from(tr.children);
  const n = cells.length;
  const shift = pos % n;

  const oldColors = cells.map((el) => getComputedStyle(el).backgroundColor);
  const newColors = oldColors.slice(n - shift, n).concat(oldColors.slice(0, n - shift));

  for (let i = 0; i < n; i++) {
    cells[i].style.backgroundColor = newColors[i];
    await sleep(30);
  }
}

async function jumble() {
  const container = document.getElementById('containerDraw');
  const table = container.querySelector('table');
  const rows = table.querySelectorAll('tr');
  const length = rows.length;

  for (let i = 0; i < length; i++) {
    const randPos = Math.floor(Math.random() * length);
    shiftRow(i, randPos);
  }
}

function transpose() {
  const getMatrix = (rows) => {
    const matrix = Array.from(rows).map((row) => {
      return Array.from(row.children).map(cell => getComputedStyle(cell).backgroundColor);
    });
    const nrows = matrix.length;
    const ncols = matrix[0].length;
    return { nrows, ncols, matrix };
  }

  const getTranspose = (matrix, nrows, ncols) => {
    for (let i = 0; i < nrows; i++) {
      for (let j = i + 1; j < ncols; j++) {
        const temp = matrix[i][j];
        matrix[i][j] = matrix[j][i];
        matrix[j][i] = temp;
      }
    }
    return matrix;
  }

  const setTransposeColors = (rows, transpose, nrows, ncols) => {
    for (let i = 0; i < nrows; i++) {
      for (let j = 0; j < ncols; j++) {
        rows[i].children[j].style.backgroundColor = transpose[i][j];
      }
    }
  }

  const container = document.getElementById('containerDraw');
  const table = container.querySelector('table');
  const rows = table.querySelectorAll('tr');
  const {
    nrows,
    ncols,
    matrix
  } = getMatrix(rows);
  const transpose = getTranspose(matrix, nrows, ncols);
  setTransposeColors(rows, transpose, nrows, ncols);
}

function flip(element) {
  const children = Array.from(element.children);
  children.reverse().forEach((child) => element.appendChild(child));
}

function mirror(direction) {
  const container = document.getElementById('containerDraw');
  const table = container.querySelector('table');
  const rows = table.querySelectorAll('tr');

  if (direction === 'horizontal') {
    rows.forEach((row) => {
      flip(row);
    });
    return;
  } else {
    flip(table);
  }
}

function smear(row, col, amount) {
  const container = document.getElementById('containerDraw');
  const table = container.querySelector('table');
  const rows = table.querySelectorAll('tr');
  const tr = Array.from(rows[row].children);
  const length = tr.length;

  if (col >= length)
    return;

  const color = tr[col].style.backgroundColor;
  let amountValue = amount;
  for (let i = col; i < length; i++) {
    amountValue /= 1.15;
    drawPixelAmount(row, i, color, amountValue);
  }
}

function blur() {
  const getMatrix = (rows) => {
    const matrix = Array.from(rows).map((row) => {
      return Array.from(row.children).map(cell => getComputedStyle(cell).backgroundColor);
    });
    const nrows = matrix.length;
    const ncols = matrix[0].length;
    return { nrows, ncols, matrix };
  }

  const getGaussianBlur = (matrix) => {
    function clamp(v, lo, hi) {
      return Math.max(lo, Math.min(hi, v));
    }

    function rgbStringToObj(s) {
      const m = s.match(/\d+/g);
      if (!m || m.length < 3) return { r: 0, g: 0, b: 0 };
      return { r: Number(m[0]), g: Number(m[1]), b: Number(m[2]) };
    }

    function rgbObjToString({ r, g, b }) {
      return `rgb(${r}, ${g}, ${b})`;
    }

    function makeGaussianKernel1D(sigma) {
      const radius = Math.ceil(3 * sigma);
      const size = 2 * radius + 1;
      const kernel = new Array(size);

      const twoSigma2 = 2 * sigma * sigma;
      let sum = 0;

      for (let i = -radius; i <= radius; i++) {
        const w = Math.exp(-(i * i) / twoSigma2);
        kernel[i + radius] = w;
        sum += w;
      }
      for (let i = 0; i < size; i++) kernel[i] /= sum;

      return { kernel, radius };
    }

    function gaussianBlurRGBStrings(matrixStr, sigma = 1.2) {
      const H = matrixStr.length;
      const W = H ? matrixStr[0].length : 0;
      if (!H || !W) return matrixStr;

      const { kernel, radius: r } = makeGaussianKernel1D(sigma);

      const img = matrixStr.map((row) => row.map(rgbStringToObj));

      const tmp = Array.from({ length: H }, () =>
        Array.from({ length: W }, () => ({ r: 0, g: 0, b: 0 }))
      );
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          let R = 0, G = 0, B = 0;

          for (let k = -r; k <= r; k++) {
            const xx = clamp(x + k, 0, W - 1);
            const w = kernel[k + r];
            const p = img[y][xx];
            R += p.r * w;
            G += p.g * w;
            B += p.b * w;
          }
          tmp[y][x] = { r: R, g: G, b: B };
        }
      }

      const outStr = Array.from({ length: H }, () => new Array(W));
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          let R = 0, G = 0, B = 0;
          for (let k = -r; k <= r; k++) {
            const yy = clamp(y + k, 0, H - 1);
            const w = kernel[k + r];
            const p = tmp[yy][x];
            R += p.r * w;
            G += p.g * w;
            B += p.b * w;
          }
          const pixel = {
            r: clamp(Math.round(R), 0, 255),
            g: clamp(Math.round(G), 0, 255),
            b: clamp(Math.round(B), 0, 255),
          };
          outStr[y][x] = rgbObjToString(pixel);
        }
      }

      return outStr;
    }

    const blurred = gaussianBlurRGBStrings(matrix, 1.2);
    return blurred;
  }

  const setBlurColors = (rows, blurred, nrows, ncols) => {
    for (let i = 0; i < nrows; i++) {
      for (let j = 0; j < ncols; j++) {
        rows[i].children[j].style.backgroundColor = blurred[i][j];
      }
    }
  }

  const container = document.getElementById('containerDraw');
  const table = container.querySelector('table');
  const rows = table.querySelectorAll('tr');
  const {
    nrows,
    ncols,
    matrix
  } = getMatrix(rows);
  const blurred = getGaussianBlur(matrix);
  setBlurColors(rows, blurred, nrows, ncols);
}

function context() {
  const context = {
    clearTable: clearTable,
    drawTable: drawTable,
    colorCol: colorCol,
    colorRow: colorRow,
    rainbow: rainbow,
    drawPixel: drawPixel,
    drawLine: drawLine,
    drawRect: drawRect,
    drawPixelExt: drawPixelExt,
    drawPixelAmount: drawPixelAmount,
    delRow: delRow,
    delCol: delCol,
    shiftRow: shiftRow,
    jumble: jumble,
    transpose: transpose,
    mirror: mirror,
    smear: smear,
    blur: blur
  };

  return context;
}

export default context;
