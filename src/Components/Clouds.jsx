import React from "react";
import Cloud from "./Cloud";

const cloudsArr = [
  { x: 7, y: 0, z: 0 },
  { x: -5, y: 0, z: 0 },
];

const Clouds = () => {
  return (
    <>
      {cloudsArr.map((cloud) => (
        <group position={[cloud.x, cloud.y, cloud.z]} key={`${cloud.x}`}>
          <Cloud />
        </group>
      ))}
    </>
  );
};

export default Clouds;
