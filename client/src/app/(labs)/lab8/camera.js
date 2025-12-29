function handleKeyDown() {
  const getVizor = () => {
    const vizor = document.getElementById("vizor");
    if (!vizor) return;

    vizor.tabIndex = 0;
    vizor.focus();
    return vizor;
  }

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
  }

  const handlMouseDown = (vizor) => {
    return;
  }


  const cleanUp = () => {
    vizor.removeEventListener("keydown", handleKeyDown);
  }

  const vizor = getVizor();
  handleKeyDown(vizor);
  handlMouseDown(vizor);
  cleanUp();
}

function context() {
  const context = {
    handleKeyDown: handleKeyDown
  }

  return context;
}

export default context;