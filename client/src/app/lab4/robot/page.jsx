"use client"
import { useState } from 'react';
import Button from '@/components/ui/button/button.jsx';

export default function Robot() {
  const [mode, setMode] = useState("grid");
  const handleClick = () => {
    setMode(prev => prev === "grid" ? "flex" : "grid");
  }

  return (
    <>
      {
        mode === "grid" ? (
          <div className="robot_grid" style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "30px", top: "30px" }}>
              <Button label={mode === "grid" ? "Change to Flex" : "Change to grid"} onClick={handleClick} />
            </div>

            <div className="robot_eyes_grid">
              <div className="robot_socket_grid">
                <div className="robot_eye_grid">
                  <div className="robot_pupil_grid"></div>
                </div>
                <div className="robot_eye_grid">
                  <div className="robot_pupil_grid"></div>
                </div>
              </div>
            </div>
            <div className="robot_mouth_grid">
              <div className="topRow_grid">
                <div className="robot_tooth_grid"></div>
                <div className="robot_tooth_grid"></div>
                <div className="robot_tooth_grid"></div>
                <div className="robot_tooth_grid"></div>
                <div style={{width: 2, backgroundColor: 'black'}}></div>
                <div className="robot_tooth_grid"></div>
                <div className="robot_tooth_grid"></div>
                <div className="robot_tooth_grid"></div>
                <div className="robot_tooth_grid"></div>
              </div>
              <div className="bottomRow_grid">
                <div className="robot_tooth_grid"></div>
                <div className="robot_tooth_grid"></div>
                <div className="robot_tooth_grid"></div>
                <div className="robot_tooth_grid"></div>
                <div className="robot_tooth_grid"></div>
                <div className="robot_tooth_grid"></div>
                <div className="robot_tooth_grid"></div>
                <div className="robot_tooth_grid"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="robot_flex" style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "30px", top: "30px" }}>
              <Button label={mode === "grid" ? "Change to Flex" : "Change to grid"} onClick={handleClick} />
            </div>

            <div className="robot_eyes_flex">
              <div className="robot_socket_flex">
                <div className="robot_eye_flex">
                  <div className="robot_pupil_flex"></div>
                </div>
                <div className="robot_eye_flex">
                  <div className="robot_pupil_flex"></div>
                </div>
              </div>
            </div>
            <div className="robot_mouth_flex">
              <div className="robot_tooth_flex"></div>
              <div className="robot_tooth_flex"></div>
              <div className="robot_tooth_flex"></div>
              <div className="robot_tooth_flex"></div>
              <div style={{width: 2, backgroundColor: 'black'}}></div>
              <div className="robot_tooth_flex"></div>
              <div className="robot_tooth_flex"></div>
              <div className="robot_tooth_flex"></div>
              <div className="robot_tooth_flex"></div>
              <div className="robot_tooth_flex"></div>
              <div className="robot_tooth_flex"></div>
              <div className="robot_tooth_flex"></div>
              <div className="robot_tooth_flex"></div>
              <div className="robot_tooth_flex"></div>
              <div className="robot_tooth_flex"></div>
              <div className="robot_tooth_flex"></div>
              <div className="robot_tooth_flex"></div>
            </div>
          </div>
        )
      }
    </>
  );
}