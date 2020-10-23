import React, { useRef, useState, Ref, Suspense } from "react";
import { useFrame, useThree } from "react-three-fiber";
import Stars from "./Stars";
import Clouds from "./Clouds";
import End from "./End";
import Start from "./Start";
import Forest from "./Forest";
import Text from "./Text";
import Computer from "./Computer";
import { isDaytime } from "../utilities/utilities";
import { GROUND_HEIGHT, LEFT_LIMIT, RIGHT_LIMIT } from "../constants/constants";
import Ufo from "./Ufo";

// This should probably be renamed...
const Terrain = ({ terrainPos, setTerrainPos }) => {
  // const [terrainPos, setTerrainPos] = useState<any>({ position: { x: 0 } });
  const terrainRef = useRef();

  const { size } = useThree();

  // Detect screen size
  const isMobile = size.width < 700;

  useFrame(({ mouse }) => {
    if (terrainRef !== undefined) {
      // Define limits on environment (TODO: Abstract up so move indicators conditionally render)
      const isBeforeEnd = terrainRef.current.position.x > -RIGHT_LIMIT;
      const isAfterStart = terrainRef.current.position.x < -LEFT_LIMIT;
      const canMoveRight = mouse.x > 0.8 && mouse.y < -0.01 && mouse.y > -0.2;
      const canMoveLeft =
        mouse.x < -0.8 && mouse.y < -0.01 && mouse.y > -0.2 && isAfterStart;

      // Instead of moving plane & camera, make terrain move right and left when mouse is at edge of screen
      if (canMoveRight && isBeforeEnd) {
        // Move to the right
        setTerrainPos({
          position: { x: (terrainRef.current.position.x -= 1) },
        });
      }

      if (canMoveLeft && isAfterStart) {
        // Move to the left
        setTerrainPos({
          position: { x: (terrainRef.current.position.x += 1) },
        });
      }
    }
  });

  useFrame(() => {
    if (terrainRef && terrainPos) {
      terrainRef.current.position.x = terrainPos.position.x;
    }
  });

  return (
    <group ref={terrainRef} dispose={null}>
      {/* TODO: Turn this into like...an environment.  */}
      <Suspense fallback={null}>
        <Forest />
      </Suspense>

      <Suspense fallback={null}>
        <Text
          children="MARY"
          size={0.1}
          position={[-7, 0, -6]}
          scale={isMobile ? [0.2, 0.2, 0.02] : [0.8, 0.8, 0.02]}
        />
        <Text
          children="SEDAROUS"
          size={0.1}
          position={[-7, -1.2, -6]}
          scale={isMobile ? [0.2, 0.2, 0.02] : [0.8, 0.8, 0.02]}
        />
      </Suspense>

      <Suspense fallback={null}>
        <Ufo />
      </Suspense>

      <Suspense fallback={null}>
        <Computer />
      </Suspense>

      <End />

      <Clouds />

      {/* Conditionally render stars if night */}
      {!isDaytime && <Stars position={[0, 0, -2]} />}
    </group>
  );
};

export default Terrain;
