import React, { useRef, useState, Ref, Suspense } from "react";
import { useFrame } from "react-three-fiber";
import Stars from "./Stars";
import Clouds from "./Clouds";
import End from "./End";
import Start from "./Start";
import Cloud from "./Cloud";
import Text from "./Text";
import { isDaytime } from "../utilities/utilities";
import { LEFT_LIMIT, RIGHT_LIMIT, GROUND_HEIGHT } from "../constants/constants";

const Terrain = () => {
  const [terrainPos, setTerrainPos] = useState<any>({ position: { x: 0 } });
  const terrainRef: Ref<any> = useRef();

  useFrame(({ mouse }) => {
    if (terrainRef !== undefined) {
      // Define limits on environment (TODO: Abstract up so move indicators conditionally render)
      const isBeforeEnd = terrainRef.current.position.x > -RIGHT_LIMIT;
      const isAfterStart = terrainRef.current.position.x < -LEFT_LIMIT;
      // Instead of moving plane & camera, make terrain move right and left when mouse is at edge of screen
      if (mouse.x > 0.7 && isBeforeEnd) {
        // Move to the right
        setTerrainPos({
          position: { x: terrainRef.current.position.x -= 1 },
        });
      }

      if (mouse.x < -0.7 && isAfterStart) {
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
    <group ref={terrainRef} dispose={null}>
      {/* TODO: Turn this into like...an environment.  */}
      {/* <mesh visible position={[0, GROUND_HEIGHT, 0]}>
        <boxBufferGeometry attach="geometry" args={[1, 1]} />
        <meshStandardMaterial
          attach="material"
          color="white"
          roughness={1}
          metalness={0.1}
        />
      </mesh> */}
      {/* Sprite text implmentation */}
      {/* <Text position={[LEFT_LIMIT, 0, 0]} opacity={1} fontSize={70}>
        MARY SEDAROUS
      </Text> */}

      <Suspense fallback={null}>
        <Text children="MARY" size={0.1} position={[-7, 0, -6]} />
        <Text children="SEDAROUS" size={0.1} position={[-7, -1.2, -6]} />
      </Suspense>

      <End />

      <Clouds />

      {/* Conditionally render stars if night */}
      {!isDaytime && <Stars position={[0, 0, -2]} />}
    </group>
  );
};

export default Terrain;
