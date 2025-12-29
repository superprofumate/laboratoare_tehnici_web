"use client"

import Image from "next/image";
import context from './camera.js';
import { useEffect } from 'react';

export default function Camera() {
  const {
    handleKeyDown
  } = context();

  useEffect(() => {
    handleKeyDown();
  }, [handleKeyDown])

  return (
    <div id="container">
      <div className="crop" id="vizor">
        <Image
          width={2048}
          height={2048}
          className="image"
          src="/lab8/beatles.webp"
          alt="beatles cover"
          />
      </div>
    </div>
  )
}