"use client";

import context from './clock.js';
import { useEffect } from 'react';

export default function Clock() {
  useEffect(() => {
    const {
      init
    } = context();

    init();
  });

  return (
    <div style={{ width: "100%", minHeight: "55vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "whitesmoke" }}>
      <canvas id="canvas" width="800" height="180" />
    </div>
  );
}