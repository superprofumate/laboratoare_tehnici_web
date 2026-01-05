function handleMoveImage() {
  const getVizor = () => {
    const vizor = document.getElementById("vizor");
    if (!vizor) return;

    vizor.tabIndex = 0;
    vizor.addEventListener("pointerdown", () => vizor.focus());
    return vizor;
  };

  const handleKeyDown = (vizor) => {
    vizor.addEventListener("keydown", (e) => {
      const isUp = e.key === "w" || e.key === "W" || e.key === "ArrowUp";
      const isDown = e.key === "s" || e.key === "S" || e.key === "ArrowDown";
      const isLeft = e.key === "a" || e.key === "A" || e.key === "ArrowLeft";
      const isRight = e.key === "d" || e.key === "D" || e.key === "ArrowRight";

      const image = vizor.querySelector("img");
      if (!image) return;

      const step = 20;
      let marginTop = parseInt(getComputedStyle(image).marginTop, 10) || 0;
      let marginLeft = parseInt(getComputedStyle(image).marginLeft, 10) || 0;

      const minLeft = vizor.clientWidth - image.clientWidth;
      const maxLeft = 0;
      const minTop = vizor.clientHeight - image.clientHeight;
      const maxTop = 0;

      if (isRight) marginLeft = Math.max(marginLeft - step, minLeft);
      if (isLeft) marginLeft = Math.min(marginLeft + step, maxLeft);
      if (isDown) marginTop = Math.max(marginTop - step, minTop);
      if (isUp) marginTop = Math.min(marginTop + step, maxTop);

      image.style.marginLeft = `${marginLeft}px`;
      image.style.marginTop = `${marginTop}px`;
    });
  };

  const dragToChangeMargin = (img, vizor) => {
    let startX = 0, startY = 0;
    let startML = 0, startMT = 0;

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    const getMargins = () => {
      const cs = getComputedStyle(img);
      return {
        ml: parseFloat(cs.marginLeft) || 0,
        mt: parseFloat(cs.marginTop) || 0,
      };
    };

    const getBounds = () => ({
      minLeft: vizor.clientWidth - img.clientWidth,
      maxLeft: 0,
      minTop: vizor.clientHeight - img.clientHeight,
      maxTop: 0,
    });

    const onPointerMove = (e) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      const { minLeft, maxLeft, minTop, maxTop } = getBounds();

      img.style.marginLeft = clamp(startML + dx, minLeft, maxLeft) + "px";
      img.style.marginTop = clamp(startMT + dy, minTop, maxTop) + "px";
    };

    const onPointerUp = (e) => {
      try { img.releasePointerCapture(e.pointerId); } catch { }
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };

    const onPointerDown = (e) => {
      e.preventDefault();
      vizor.focus();

      img.setPointerCapture(e.pointerId);

      const { ml, mt } = getMargins();
      startML = ml;
      startMT = mt;
      startX = e.clientX;
      startY = e.clientY;

      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
    };

    // ✅ ASTEA LIPSEAU:
    img.style.touchAction = "none";
    img.addEventListener("pointerdown", onPointerDown);

    // opțional: return cleanup
    return () => {
      img.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  };

  const vizor = getVizor();
  if (!vizor) return;

  handleKeyDown(vizor);

  const img = vizor.querySelector("img");
  if (!img) return;

  dragToChangeMargin(img, vizor);
}

function handleScaleImage() {
  const vizor = document.getElementById("vizor");
  if (!vizor) return;

  const image = vizor.querySelector("img");
  if (!image) return;

  // salvează dimensiunea de bază (cea inițială) o singură dată
  if (!image.dataset.baseW) {
    image.dataset.baseW = String(image.clientWidth);
    image.dataset.baseH = String(image.clientHeight);
    image.dataset.scale = "1";
  }

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const onKeyDown = (e) => {
    const isZoomIn = e.key === "+" || e.key === "=";
    const isZoomOut = e.key === "-" || e.key === "_";
    if (!isZoomIn && !isZoomOut) return;

    e.preventDefault(); // să nu faci zoom la browser / să nu scrii caracterul

    const baseW = parseFloat(image.dataset.baseW);
    const baseH = parseFloat(image.dataset.baseH);

    const step = 0.1;

    let scale = parseFloat(image.dataset.scale) || 1;

    // minScale = cât trebuie ca să nu fie imaginea mai mică decât vizorul pe niciuna din axe
    const minScale = Math.max(vizor.clientWidth / baseW, vizor.clientHeight / baseH);
    const maxScale = 4; // alege tu cât vrei (safety)

    const oldW = baseW * scale;
    const oldH = baseH * scale;

    if (isZoomIn) scale *= (1 + step);
    if (isZoomOut) scale *= (1 - step);

    scale = clamp(scale, minScale, maxScale);

    const newW = baseW * scale;
    const newH = baseH * scale;

    // marginile curente
    let mt = parseFloat(getComputedStyle(image).marginTop) || 0;
    let ml = parseFloat(getComputedStyle(image).marginLeft) || 0;

    // păstrează zoom-ul “centrat” (compensezi jumătate din delta)
    ml -= (newW - oldW) / 2;
    mt -= (newH - oldH) / 2;

    // clamp margini ca să nu apară gol pe niciuna din margini
    const minLeft = vizor.clientWidth - newW;
    const maxLeft = 0;
    const minTop = vizor.clientHeight - newH;
    const maxTop = 0;

    ml = clamp(ml, minLeft, maxLeft);
    mt = clamp(mt, minTop, maxTop);

    // aplică
    image.style.width = `${newW}px`;
    image.style.height = `${newH}px`;
    image.style.marginLeft = `${ml}px`;
    image.style.marginTop = `${mt}px`;

    image.dataset.scale = String(scale);
  };

  vizor.addEventListener("keydown", onKeyDown);

  // opțional: return cleanup dacă îl chemi din useEffect
  return () => vizor.removeEventListener("keydown", onKeyDown);
}

function handleStartCamera() {
  const button = document.getElementById("cameraButton");
  const video = document.getElementById("video");
  if (!button || !video) return;

  let isRunning = false;

  const showClientMedia = async () => {
    try {
      button.disabled = true;
      button.textContent = "loading...";

      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      video.srcObject = stream;

      await video.play();

      isRunning = true;
      button.textContent = "stop camera";
    } catch (err) {
      console.error("Error accessing camera: ", err);
      button.textContent = "start camera";
      isRunning = false;
    } finally {
      button.disabled = false;
    }
  };

  const hideClientMedia = () => {
    const stream = video.srcObject;
    if (stream && typeof stream.getTracks === "function") {
      stream.getTracks().forEach((track) => track.stop());
    }
    video.srcObject = null;

    isRunning = false;
    button.textContent = "start camera";
  };

  button.addEventListener("click", () => {
    if (isRunning) {
      hideClientMedia();
    } else {
      showClientMedia();
    }
  });
}

function handleTakePhoto() {
  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const cameraVizor = document.getElementById("cameraVizor");

  if (!video || !canvas || !cameraVizor) return;

  // container unde pui pozele (opțional)
  let photos = document.getElementById("gallery");
  if (!photos) {
    photos = document.createElement("div");
    photos.id = "gallery";
    cameraVizor.appendChild(photos);
  }

  const onKeyDown = (e) => {
    if (e.key?.toLowerCase() !== "c") return;

    if (!video.videoWidth || !video.videoHeight) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (!blob) return;

      const url = URL.createObjectURL(blob);

      const img = document.createElement("img");
      img.src = url;
      img.alt = "captured photo";
      img.style.height = "80px";
      img.style.width = "auto"; // optional, ca să nu fie gigantic

      photos.appendChild(img);

      // dacă vrei cleanup de memorie când ștergi poza:
      // img.addEventListener("load", () => URL.revokeObjectURL(url)); // ATENȚIE: nu revoke imediat dacă vrei să rămână afișată
    }, "image/png");

    const children = photos.children;
    const length = children.length;

    
  };

  document.addEventListener("keydown", onKeyDown);

  // IMPORTANT dacă e chemată de mai multe ori (React dev): cleanup
  return () => document.removeEventListener("keydown", onKeyDown);
}

function context() {
  const context = {
    handleMoveImage: handleMoveImage,
    handleScaleImage: handleScaleImage,
    handleStartCamera: handleStartCamera,
    handleTakePhoto: handleTakePhoto
  }

  return context;
}

export default context;