//@ts-nocheck
import React, { Suspense, useRef } from "react";
import {
  Canvas,
  useLoader,
  useFrame,
  extend,
  useThree,
} from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  const controls = useRef<OrbitControls>();

  useFrame((state) => {
    controls.current?.update();
  });

  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      // Zoom and rotate disabled for better 2.5D movement/control esp. on phones
      enableZoom={false}
      enableRotate={false}
      maxAzimuthAngle={Math.PI / 4}
      maxPolarAngle={Math.PI}
      minAzimuthAngle={-Math.PI / 4}
      minPolarAngle={0}
    />
  );
};

export default CameraControls;
