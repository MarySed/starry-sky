import React, { Suspense, useState } from "react";
import classNames from "classnames";
import { Canvas, extend } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Character from "./Character.tsx";
import Loading from "./Loading.tsx";
import CameraControls from "./CameraControls.tsx";
import Terrain from "./Terrain";
import { isDaytime } from "../utilities/utilities";
import styles from "./Game.module.scss";
import { LEFT_LIMIT, RIGHT_LIMIT } from "../constants/constants";

extend({ OrbitControls });

const Game = () => {
  const [terrainPos, setTerrainPos] = useState({ position: { x: 0 } });

  console.log(terrainPos);

  return (
    <>
      <Suspense fallback={null}>
        <Canvas
          className={classNames({
            [styles.day]: isDaytime,
            [styles.night]: !isDaytime,
          })}
          shadowMap
        >
          <CameraControls />

          <directionalLight intensity={0.5} />
          <ambientLight color="#d8d0d1" intensity={0.8} />
          {/* TODO: Consider if fog is worth using or not, and where to use */}
          {/* <fog attach="fog" args={["#cc7b32", 1, 20]} /> */}

          <Suspense fallback={<Loading />}>
            <Character />
          </Suspense>
          <Terrain terrainPos={terrainPos} setTerrainPos={setTerrainPos} />
        </Canvas>
      </Suspense>

      <div className={styles["move-forward"]}>
        <span className={styles.indicator}>
          {terrainPos.position.x !== -RIGHT_LIMIT ? ">" : ""}
        </span>
      </div>

      <div className={styles["move-backward"]}>
        <span className={styles.indicator}>
          {terrainPos.position.x !== -LEFT_LIMIT ? "<" : ""}
        </span>
      </div>
    </>
  );
};

export default Game;
