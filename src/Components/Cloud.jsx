import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { LEFT_LIMIT, RIGHT_LIMIT } from "../constants/constants";

const Cloud = (key) => {
  const cloudRef = useRef();

  useFrame(() => {
    console.log(cloudRef.current);
    // Clouds should drift across the screen
    const findCloud = (id) => {
      return cloudRef.current.uuid === id;
    };

    if (cloudRef.current.position.x <= LEFT_LIMIT) {
      cloudRef.current.position.x = RIGHT_LIMIT;
    }
    cloudRef.current.position.x -= 0.05;
  });

  return (
    <group ref={cloudRef} dispose={null} key={key}>
      <mesh visible position={[-1, 3.8, -3]} rotation={[0, 0, 0]} castShadow>
        <sphereGeometry attach="geometry" args={[0.8, 16, 16]} />
        <meshStandardMaterial
          attach="material"
          color="white"
          transparent
          roughness={1}
          metalness={0.1}
        />
      </mesh>
      <mesh visible position={[0, 4, -3]} rotation={[0, 0, 0]} castShadow>
        <sphereGeometry attach="geometry" args={[1, 16, 16]} />
        <meshStandardMaterial
          attach="material"
          color="white"
          transparent
          roughness={1}
          metalness={0.1}
        />
      </mesh>
      <mesh visible position={[1, 3.8, -3]} rotation={[0, 0, 0]} castShadow>
        <sphereGeometry attach="geometry" args={[0.8, 16, 16]} />
        <meshStandardMaterial
          attach="material"
          color="white"
          transparent
          roughness={1}
          metalness={0.1}
        />
      </mesh>

      {/* Trailing cloud fluff */}
      <mesh visible position={[3, 3.8, -3]} rotation={[0, 0, 0]} castShadow>
        <sphereGeometry attach="geometry" args={[0.3, 16, 16]} />
        <meshStandardMaterial
          attach="material"
          color="white"
          transparent
          roughness={1}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
};

export default Cloud;
