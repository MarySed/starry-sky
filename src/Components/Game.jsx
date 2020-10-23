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
import MoonIcon from "../Assets/Icons/MoonIcon";
import SunIcon from "../Assets/Icons/SunIcon";

extend({ OrbitControls });

const Game = () => {
  const [isDay, setIsDay] = useState(isDaytime);
  const [terrainPos, setTerrainPos] = useState({ position: { x: 0 } });

  const fogColor = isDay ? "#b666d2" : "#85e21f";

  return (
    <>
      <Suspense fallback={null}>
        <Canvas
          className={classNames({
            [styles.day]: isDay,
            [styles.night]: !isDay,
          })}
          shadowMap
        >
          <CameraControls />

          <directionalLight intensity={0.5} />
          <ambientLight color="#d8d0d1" intensity={0.8} />
          {/* TODO: Decide between the classic halloween colors of green (#85e21f) and orange (#cc7b32) */}
          <fog attach="fog" args={[fogColor, 1, 20]} />

          <Suspense fallback={<Loading />}>
            <Character />
          </Suspense>
          <Terrain
            terrainPos={terrainPos}
            setTerrainPos={setTerrainPos}
            isDay={isDay}
          />
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

      <div className={styles["day-night"]}>
        {isDay ? (
          <span onClick={() => setIsDay(!isDay)}>
            <SunIcon />
          </span>
        ) : (
          <span onClick={() => setIsDay(!isDay)}>
            <MoonIcon />
          </span>
        )}
      </div>
    </>
  );
};

export default Game;
