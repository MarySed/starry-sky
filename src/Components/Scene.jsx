import React from "react";
import { useThree } from "react-three-fiber";
import { a, interpolate } from "react-spring/three";
import Background from "./Background";
import Stars from "./Stars";

const Scene = ({ top, mouse }) => {
  const { size } = useThree();
  const scrollMax = size.height * 6;

  return (
    <>
      <a.spotLight
        intensity={1.2}
        color="white"
        position={mouse.interpolate((x, y) => [x / 100, -y / 100, 6.5])}
      />

      <Background
        color={top.interpolate(
          [0, scrollMax * 0.25, scrollMax * 0.8, scrollMax],
          ["#27282F", "#42434f", "#b8bac4", "#b8bac4"]
        )}
      />
      <Stars position={top.interpolate((top) => [0, -1 + top / 20, 0])} />
    </>
  );
};

export default Scene;
