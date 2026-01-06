"use client";
import context from './fonoteca.js';
import { useEffect, useState } from 'react';

const ALBUMS_URL = "http://localhost:8000/albums.json";

export default function Fonoteca() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const {
      fetchData,
      displayImages
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
  }, []);

  useEffect(() => {
    if (!data)
      return;

    console.log(data);
  }, [data]);

  return (
    <div id="container">
      <div id="gallery">
      </div>
      <div id="info">
      </div>
    </div>
  );
}