"use client";

import context from './door.js';
import { useEffect } from 'react';

export default function Door() {
  useEffect(() => {
    const {
      init,
      draw
    } = context();
  
    init();
    draw();
  });

  return (
    <div style={{ width: "100%", minHeight: "55vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "whitesmoke"}}>
      <canvas id="canvdoor" width="500" height="500"></canvas>
    </div>
  )
}