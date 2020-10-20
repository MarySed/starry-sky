import React, { useRef, useState, Ref, Suspense } from "react";
import { useFrame, useThree } from "react-three-fiber";
import Stars from "./Stars";
import Clouds from "./Clouds";
import End from "./End";
import Start from "./Start";
import Forest from "./Forest";
import Text from "./Text";
import { isDaytime } from "../utilities/utilities";
import { LEFT_LIMIT, RIGHT_LIMIT, GROUND_HEIGHT } from "../constants/constants";

// This should probably be renamed...
const Terrain = () => {
  const [terrainPos, setTerrainPos] = useState<any>({ position: { x: 0 } });
  const terrainRef: Ref<any> = useRef();

  const { size } = useThree();

  // Detect screen size
  const isMobile = size.width < 700;

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
        <Text
          children="THE"
          position={[LEFT_LIMIT - 25, -4, 6]}
          rotation={[0, 0, Math.PI / 2]}
          scale={isMobile ? [0.2, 0.2, 0.02] : [0.4, 0.4, 0.02]}
        />
        <Text
          children="BEGINNING"
          position={[LEFT_LIMIT - 25, -0.5, 6]}
          rotation={[0, 0, Math.PI / 2]}
          scale={isMobile ? [0.2, 0.2, 0.02] : [0.4, 0.4, 0.02]}
        />
      </Suspense>

      <End />

      <Clouds />

      {/* Conditionally render stars if night */}
      {!isDaytime && <Stars position={[0, 0, -2]} />}
    </group>
  );
};

export default Terrain;
