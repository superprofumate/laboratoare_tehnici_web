"use client"

import Image from "next/image";
import context from './camera.js';
import { useEffect } from 'react';

export default function Camera() {
  const {
    handleMoveImage,
    handleScaleImage,
    handleStartCamera,
    handleTakePhoto
  } = context();

  useEffect(() => {
    handleMoveImage();
    handleScaleImage();
    handleStartCamera();
    handleTakePhoto();
  }, [
    handleMoveImage,
    handleScaleImage,
    handleTakePhoto,
    handleStartCamera
  ])

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

      <div id="cameraVizor" tabIndex="0" >
        <div className='topLid'>
          <button id="cameraButton"> start camera </button>
        </div>

        <video id="video" autoPlay playsInline ></video>
        <canvas id="canvas"></canvas>
        <div className='bottomLid'>
          <button id="galleryLeft"> {`<-`} </button>
          <div id='gallery'>
            {
              /*
                Aici sunt introduse imaginile
              */
            }
          </div>
          <button id="galleryRight"> {`->`} </button>
        </div>
      </div>
    </div>
  )
}