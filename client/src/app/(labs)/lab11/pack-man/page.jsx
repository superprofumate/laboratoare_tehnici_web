"use client";

import context from './pack-man.js';
import { useEffect } from 'react';

export default function PackMan() {
  useEffect(() => {
    const {
      init
    } = context();
  
    init();
  });

  return (
    <div style={{ width: "100%", minHeight: "55vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "whitesmoke" }}>
      <canvas id="canvas" width="500" height="500"></canvas>
    </div>
  );
}