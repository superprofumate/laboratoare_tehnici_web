// use src={`${IMAGES_URL}{album.image}`}
const IMAGES_URL = "http://localhost:8000/images";

// const descriptionObj = await fetchData(`${DESCRIPTION_URL}{album.index}.json`)
const DESCRIPTION_URL = "http://localhost:8000/albums";

const createElement = (tag, parent) => {
  const elem = document.createElement(tag);
  parent.appendChild(elem);
  return elem;
};

async function fetchData(path) {
  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (e) {
    console.error("FETCH ERROR:", e);
    throw e;
  }
}

async function displayImages() {
  const gallery = document.getElementById("gallery");
  const data = await fetchData("http://localhost:8000/albums.json");
  data.forEach((album) => {
    const img = createElement("img", gallery);
    img.src = `${IMAGES_URL}/${album.image}`;
    img.alt = album.title;
    img.width = 250;
    img.height = 250;
  })

  const album = {
    index: 0,
    imageUrl: `${IMAGES_URL}/selected-ambient-works-volume-ii.webp`
  };
  await displayImage(album);
}

async function displayImage(album = { index: 0, imageUrl: `${IMAGES_URL}/selected-ambient-works-volume-ii.webp` }) {
  const info = document.getElementById("info");

  //image
  const img = createElement("img", info);
  img.src = album.imageUrl;
  img.alt = "Album 1";
  img.width = 500;
  img.height = 500;

  const albumDescription = await fetchData(`${DESCRIPTION_URL}/${album.index}.json`);

  //title
  const title = createElement("h2", info);
  title.textContent = albumDescription.title;

  //artist
  const artist = createElement("h3", info);
  artist.textContent = albumDescription.artist;

  //year
  const year = createElement("p", info);
  year.textContent = `Year: ${albumDescription.year}`;

  //genre
  const genres = createElement("p", info);
  genres.textContent = `Genres: ${albumDescription.genres.join(", ")}`;

  //description
  const description = createElement("p", info);
  description.textContent = albumDescription.description;
}

function context() {
  const context = {
    fetchData,
    displayImages
  };
  return context;
}

export default context;