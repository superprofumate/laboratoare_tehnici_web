"use client";
import context from './fonoteca.js';
import { useEffect, useState } from 'react';
import { BsSearchHeart } from "react-icons/bs";

const ALBUMS_URL = "http://localhost:8000/albums.json";

export default function Fonoteca() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const {
      fetchData,
      displayImages,
      displayOption,
      init
    } = context();

    (async () => {
      try {
        const req = await fetchData(ALBUMS_URL);
        setData(req);
      } catch (e) {
        console.error("Failed to load albums:", e);
      }
    })();

    displayImages();
    displayOption();
    init();
  }, []);

  useEffect(() => {
    if (!data)
      return;

    console.log(data);
  }, [data]);

  return (
    <div id="container">
      <div id="galleryHandler">
        <div className='searchArea'>
          <input type="text" id="gallerySearch"/>
          <button>
            <BsSearchHeart size={20} />
          </button>
        </div>
        <div id="gallery">
      </div>
      </div>
      <div id="info">
      </div>
    </div>
  );
}