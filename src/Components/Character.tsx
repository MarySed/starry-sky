import React, { useRef, Ref, useState } from "react";
import { useLoader, useFrame } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Character = () => {
  const [userPosition, setUserPosition] = useState<any>();

  // Place GLB models in public dir
  const { nodes }: any = useLoader(GLTFLoader, "/models/paper-plane.glb");

  const user: Ref<any> = useRef();
  // useFrame runs outside of react in optimized animation frames
  // Update this to take keyboard input instead
  useFrame(({ mouse }) => {
    if (user !== undefined) {
      // return (group.current.rotation.y += 0.004);

      const flipPlane = () => {
        // Make plane face left
        if (mouse.x < -0.5) {
          return -Math.PI / 2;
        }

        return -mouse.y * 0.2;
      };

      setUserPosition({
        position: { x: mouse.x * 6, y: mouse.y * 2 },
        rotation: { z: -mouse.x * 0.2, x: -mouse.x * 0.5, y: flipPlane() },
      });
    }
  });

  useFrame(() => {
    user.current.rotation.z = userPosition.rotation.z;
    user.current.rotation.y = userPosition.rotation.y;
    user.current.rotation.x = userPosition.rotation.x;
    user.current.position.x = userPosition.position.x;
    user.current.position.y = userPosition.position.y;
  });

  return (
    <group ref={user}>
      <mesh
        visible
        geometry={nodes["Airplane_1"].geometry}
        // display model at 90 degree angle to screen for 2.5D experience
        rotation={[0, Math.PI / 2, 0]}
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

export default Character;
