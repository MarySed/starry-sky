import React, { useCallback } from "react";
import { Canvas } from "react-three-fiber";
import { useSpring } from "react-spring/three";
import Scene from "./Components/Scene";
import "./App.css";

function App() {
  const [{ top, mouse }, set] = useSpring(() => ({ top: 0, mouse: [0, 0] }));

  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) => {
      set({ mouse: [x - window.innerWidth / 2, y - window.innerHeight / 2] });
    },
    [set]
  );

  const onScroll = useCallback(
    (e) => {
      set({ top: e.target.scrollTop });
    },
    [set]
  );

  return (
    <>
      <Canvas className="canvas">
        <Scene top={top} mouse={mouse} />
      </Canvas>
      <div
        className="scroll-container"
        onScroll={onScroll}
        onMouseMove={onMouseMove}
      >
        <div style={{ height: "525vh" }}>
          <div className="d-flex justify-content-center align-items-center header">
            <div className="h1">Hello world</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
