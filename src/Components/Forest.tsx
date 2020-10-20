import React from "react";
import { Vector3 } from "three";
import { LEFT_LIMIT, RIGHT_LIMIT, GROUND_HEIGHT } from "../constants/constants";

type Props = {
  position: any; // Can't use number[] due to clash between position types
};

const Tree = ({ position }: Props) => {
  return (
    <mesh visible position={position} scale={[0.8, 0.8, 0.2]}>
      <coneBufferGeometry attach="geometry" args={[1, 2, 8]} />
      <meshStandardMaterial
        attach="material"
        color="#122b0d"
        roughness={1}
        metalness={0.1}
      />
    </mesh>
  );
};

const Forest = () => {
  return (
    <>
      <Tree position={[0, GROUND_HEIGHT, 0]} />
      <Tree position={[-4, GROUND_HEIGHT, 0]} />
      <Tree position={[4, GROUND_HEIGHT, 0]} />
    </>
  );
};

export default Forest;
