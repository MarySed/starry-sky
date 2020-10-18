import React, { useMemo } from "react";
import * as THREE from "three";
import { useLoader, useUpdate, useThree } from "react-three-fiber";

//TODO: Consider replacing with 3D rendered text.
// const Text = ({
//   children,
//   position,
//   opacity,
//   color = "white",
//   fontSize = 410,
// }) => {
//   const {
//     size: { width, height },
//   } = useThree();

//   const canvas = useMemo(() => {
//     const canvas = document.createElement("canvas");
//     canvas.width = canvas.height = 1024;
//     const context = canvas.getContext("2d");
//     context.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif`;
//     context.textAlign = "center";
//     context.textBaseline = "middle";
//     context.fillStyle = color;
//     context.fillText(children, 614, 614 - 410 / 2);
//     return canvas;
//   }, [children, width, height]);

//   return (
//     <sprite scale={[10, 10, 1]} position={position}>
//       <spriteMaterial attach="material" transparent opacity={opacity}>
//         <canvasTexture
//           attach="map"
//           image={canvas}
//           premultiplyAlpha
//           onUpdate={(s) => (s.needsUpdate = true)}
//         />
//       </spriteMaterial>
//     </sprite>
//   );
// };

// export default Text;

const Text = ({ children = "TEST", color = "#000000", position, ...props }) => {
  const font = useLoader(THREE.FontLoader, "/font.blob");
  const { size } = useThree();

  // Change font scale based on screen size
  const isMobile = size.width < 700;
  const scale = isMobile ? [0.2, 0.2, 0.02] : [0.8, 0.8, 0.02];

  const config = useMemo(
    () => ({
      size: 1,
      font,
      height: 3,
      curveSegments: 14,
    }),
    [font]
  );

  return (
    <group {...props} scale={scale}>
      <mesh visible position={position}>
        <textGeometry attach="geometry" args={[children, config]} />
        <meshStandardMaterial attach="material" color="white" />
      </mesh>
    </group>
  );
};

export default Text;
