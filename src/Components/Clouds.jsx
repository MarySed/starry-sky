import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import Cloud from "./Cloud";
import { LEFT_LIMIT, RIGHT_LIMIT } from "../constants/constants";

const cloudsArr = [
  { x: 7, y: 0, z: 0, name: "one" },
  { x: -5, y: 0, z: 0, name: "two" },
];

const Clouds = () => {
  const cloudsRef = useRef([useRef(), useRef()]);

  useFrame(() => {
    // Clouds should drift across the screen
    cloudsRef.current.map((cloud) => {
      if (cloud.current.position.x <= LEFT_LIMIT - 4) {
        // Loop clouds
        return (cloud.current.position.x = RIGHT_LIMIT + 4);
      }

      cloud.current.position.x -= 0.1;
    });
  });

  return (
    <>
      {cloudsArr.map((cloud, idx) => {
        return (
          <group
            position={[cloud.x, cloud.y, cloud.z]}
            key={`${cloud.x}`}
            ref={cloudsRef.current[idx]}
            name={`${cloud.name}`}
          >
            <Cloud key={`${cloud.name}`} />
          </group>
        );
      })}
    </>
  );
};

export default Clouds;
