import React, { useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useFrame, useLoader } from "react-three-fiber";

const Cow = () => {
  const { nodes } = useLoader(GLTFLoader, "/models/cow.glb");

  const cowRef = useRef(null);

  //   useFrame(({ mouse }) => {
  //     if (cowRef !== null) {
  //       setCowPos({
  //         position: { x: mouse.x * 6, y: mouse.y * 2 },
  //         rotation: { z: -mouse.x * 0.2, x: -mouse.x * 0.5, y: mouse.y * 2 },
  //       });
  //     }
  //   });

  return (
    <group ref={cowRef} dispose={null}>
      <mesh
        geometry={nodes["grp1"].children[0].geometry}
        visible
        scale={[0.001, 0.001, 0.001]}
        rotation={[-Math.PI / 2, Math.PI / 2, 1]}
        position={[18, -3, 0]}
      >
        <meshStandardMaterial
          attach="material"
          color="white"
          roughness={0.3}
          metalness={0.3}
        />
      </mesh>
    </group>
  );
};

export default Cow;
