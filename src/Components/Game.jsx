import React, { Suspense } from "react";
import classNames from "classnames";
import { Canvas, extend } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Character from "./Character.tsx";
import Loading from "./Loading.tsx";
import CameraControls from "./CameraControls.tsx";
import Terrain from "./Terrain";
import { isDaytime } from "../utilities/utilities";
import styles from "./Game.module.scss";

extend({ OrbitControls });

const Game = () => {
  return (
    <Canvas
      className={classNames({
        [styles.day]: isDaytime,
        [styles.night]: !isDaytime,
      })}
      shadowMap
    >
      <CameraControls />

      <directionalLight intensity={0.5} />
      <ambientLight color="#d8d0d1" />
      {/* TODO: Consider if fog is worth using or not, and where to use */}
      {/* <fog attach="fog" args={["#cc7b32", 300, 350]} /> */}

      <Suspense fallback={<Loading />}>
        <Character />
      </Suspense>
      <Terrain />
    </Canvas>
  );
};

export default Game;