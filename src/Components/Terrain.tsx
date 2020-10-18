import React, { useRef, useState, Ref } from "react";
import { useFrame } from "react-three-fiber";
import Stars from "./Stars";
import Clouds from "./Clouds";
import { isDaytime } from "../utilities/utilities";

const GROUND_HEIGHT = -50;

const Terrain = () => {
  const [terrainPos, setTerrainPos] = useState<any>({ position: { x: 0 } });
  const terrainRef: Ref<any> = useRef();

  useFrame(({ mouse }) => {
    if (terrainRef !== undefined) {
      // Instead of moving plane & camera, make terrain move right and left when mouse is at edge of screen
      if (mouse.x > 0.7) {
        // Move to the right
        setTerrainPos({
          position: { x: terrainRef.current.position.x -= 1 },
        });
      }

      if (mouse.x < -0.7) {
        // Move to the left
        setTerrainPos({
          position: { x: terrainRef.current.position.x += 1 },
        });
      }
    }
  });

  useFrame(() => {
    if (terrainRef !== undefined) {
      terrainRef.current.position.x = terrainPos.position.x;
    }
    return null;
  });

  return (
    <group ref={terrainRef}>
      <mesh
        visible
        position={[0, GROUND_HEIGHT, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeBufferGeometry attach="geometry" args={[5000, 5000, 128, 128]} />

        <meshPhongMaterial
          attach="material"
          color="#138095"
          //@ts-ignore
          emissive="#48555a"
          shininess={100}
          wireframe
        />
      </mesh>

      <Clouds />

      {/* Conditionally render stars if night */}
      {!isDaytime && <Stars position={[0, 0, -2]} />}
    </group>
  );
};

export default Terrain;
