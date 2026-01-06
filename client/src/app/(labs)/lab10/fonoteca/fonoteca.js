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
}

async function displayOption(album = { index: 0, imageUrl: `${IMAGES_URL}/selected-ambient-works-volume-ii.webp` }) {
  const info = document.getElementById("info");
  const albumDescription = await fetchData(`${DESCRIPTION_URL}/${album.index}.json`);

  //name
  const title = createElement("h2", info);
  title.textContent = albumDescription.name;
  title.classList.add("text", "text--subtitle", "title");
  title.id = "title";

  //image
  const img = createElement("img", info);
  img.src = album.imageUrl;
  img.alt = "Album 1";
  img.classList.add("image");
  img.id = "image";

  //artist
  const artist = createElement("p", info);
  artist.textContent = `Artist: ${albumDescription.artist}`;
  artist.classList.add("text", "text--label");
  artist.id = "artist";

  //year
  const year = createElement("p", info);
  year.textContent = `Year: ${albumDescription.year}`;
  year.classList.add("text", "text--label");
  year.id = "year";

  //genre
  const genres = createElement("p", info);
  genres.textContent = `Genres: ${albumDescription.genres.join(", ")}`;
  genres.classList.add("text", "text--label");
  genres.id = "genres";

  //label
  const label = createElement("p", info);
  label.textContent = `Label: ${albumDescription.label}`;
  label.classList.add("text", "text--label");
  label.id = "label";

  //format
  const format = createElement("p", info);
  format.textContent = `Format: ${albumDescription.format}`;
  format.classList.add("text", "text--label");
  format.id = "format";
}

function replaceDisplayOption(album = {}) {
  const {
    name = "Selected Ambient Works Volume II",
    image = "selected-ambient-works-volume-ii.webp",
    artist = "Aphex Twin",
    year = "1994",
    label = "Warp, Sire, Warner Bros.",
    format = "LP",
    genres = ["Ambient", "Dark Ambient", "Electronic"],
  } = album;

  const updates = {
    title: name,
    image: `${IMAGES_URL}/${image}`,
    artist: `Artist: ${artist}`,
    year: `Year: ${year}`,
    genres: `Genres: ${genres.join(", ")}`,
    label: `Label: ${label}`,
    format: `Format: ${format}`,
  };
  console.log(updates.image);

  for (const [id, value] of Object.entries(updates)) {
    const el = document.getElementById(id);
    if (!el) continue;

    if (el.tagName === "IMG") el.src = value;
    else el.textContent = value;
  }
}

const getAlbumFromImageSrc = async (src) => {
  const imageName = src.split("/").at(-1).split("?")[0];

  for (let idx = 0; idx < 15; idx++) {
    const album = await fetchData(`${DESCRIPTION_URL}/${idx}.json`);
    const found = album.image === imageName;
    if (found)
      return album;
  }

  return null;
};

async function handleAlbumClick(e) {
  const target = e.target;

  if (target.tagName.toLowerCase() !== "img")
    return;

  document.getElementById("info").scrollIntoView({
    behavior: "smooth",
    block: "center",
  });

  const targetAlbum = await getAlbumFromImageSrc(target.src);
  replaceDisplayOption(targetAlbum);
}

async function handleSearchInput() {
  const getSearchData = async () => {
    let titles = [];
    let releseYears = [];
    let artists = [];
    for (let idx = 0; idx < 15; idx++) {
      const album = await fetchData(`${DESCRIPTION_URL}/${idx}.json`);
      titles.push(album.name.toLowerCase());
      releseYears.push(album.year.toString());
      artists.push(album.artist.toLowerCase());
    }
    return { titles, releseYears, artists };
  };

  const gallery = document.getElementById("gallery");
  const images = gallery.getElementsByTagName("img");
  const {
    titles,
    releseYears,
    artists
  } = await getSearchData();

  Array.from(images).forEach((img, i) => {
    img.dataset.title = titles[i];
    img.dataset.year = releseYears[i];
    img.dataset.artist = artists[i];
  });

  return images ;
}

function displayBySearch(images, e) {
  const query = e.target.value.toLowerCase();

  Array.from(images).forEach((img) => {
    const haystack = `${img.dataset.title} ${img.dataset.artist} ${img.dataset.year}`;
    const match = query === "" || haystack.includes(query);
    img.style.display = match ? "" : "none";
  });
}

async function init() {
  const gallery = document.getElementById("gallery");
  gallery.addEventListener("click", (e) => { handleAlbumClick(e) });

  const input = document.querySelector(".searchArea input");
  const images = await handleSearchInput();
  input.addEventListener("input", (e) => { displayBySearch(images, e) });
}

function context() {
  const context = {
    fetchData,
    displayImages,
    displayOption,
    init
  };
  return context;
}

export default context;