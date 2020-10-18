import React from "react";
import { LEFT_LIMIT, GROUND_HEIGHT } from "../constants/constants";

const Start = () => {
  return (
    <>
      <mesh
        visible
        position={[LEFT_LIMIT, 2, -4]}
        rotation={[0, 0, 0.1]}
        receiveShadow
      >
        <planeBufferGeometry attach="geometry" args={[12, 6, 2, 2]} />
        <meshStandardMaterial
          attach="material"
          color="white"
          roughness={1}
          metalness={0.1}
        />
      </mesh>
    </>
  );
};

export default Start;
