function handleForm() {
  const form = document.querySelector('form');
  const page = document.getElementById('page');
  if (!form || !page) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.style.transform = "scale(0) rotate(360deg)";
    page.style.minHeight = "55vh";
    page.style.height = "55vh";

    const eplosionGif = document.createElement('img');
    eplosionGif.src = '/lab9/explosion.gif';
    eplosionGif.alt = 'explosion gif';
    eplosionGif.id = 'explosionGif';
    eplosionGif.style.width = '300px';
    eplosionGif.style.height = '300px';

    setTimeout(() => {
      page.innerHTML = '';
      page.appendChild(eplosionGif);

      setTimeout(() => {
        page.removeChild(eplosionGif);

        const successMessage = document.createElement('h2');
        successMessage.id = 'successMessage';
        successMessage.textContent = 'Cererea ta a fost trimisă cu succes! Bine ai venit în Sistemul Solar!';
        successMessage.className = 'text text--title text--titlePrimary';
        successMessage.style.textAlign = 'center';
        successMessage.style.color = 'white';
        successMessage.style.opacity = '0';
        successMessage.style.transition = 'all 100ms ease-in-out';

        setInterval(() => {
          successMessage.style.opacity = '1';
        }, 100);
        page.appendChild(successMessage);
      }, 500);
    }, 900);
  });
}

function handleCreditScore() {
  const creditScoreInput = document.getElementById("credit");
  if (!creditScoreInput) return;

  const creditDisplay = document.createElement("p");
  creditScoreInput.parentNode.appendChild(creditDisplay);

  const update = () => {
    creditDisplay.textContent = creditScoreInput.value;
  };

  update();

  creditScoreInput.addEventListener("input", update);
}

function handleColors(){
  document
      .getElementById('page')
      .style
      .backgroundColor = localStorage.getItem("bgColor") ?? "#201B3C";

  const colors = document.getElementById("colors");
  colors.value = localStorage.getItem("bgColor") ?? "#201B3C";
  
  if(!colors) return;
  console.log(localStorage)
  colors.addEventListener("input", (e) => {
    document
      .getElementById('page')
      .style
      .backgroundColor = e.target.value;
      localStorage.setItem("bgColor", e.target.value);
  });
}

function context() {
  const context = {
    handleForm,
    handleCreditScore,
    handleColors
  }
  return context;
}

export default context;