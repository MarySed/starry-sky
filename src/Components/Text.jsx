import React, { useMemo } from "react";
import { useThree } from "react-three-fiber";

//TODO: Consider replacing with 3D rendered text.
const Text = ({
  children,
  position,
  opacity,
  color = "white",
  fontSize = 410,
}) => {
  const {
    size: { width, height },
  } = useThree();

  const canvas = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1024;
    const context = canvas.getContext("2d");
    context.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = color;
    context.fillText(children, 614, 614 - 410 / 2);
    return canvas;
  }, [children, width, height]);

  return (
    <sprite scale={[10, 10, 1]} position={position}>
      <spriteMaterial attach="material" transparent opacity={opacity}>
        <canvasTexture
          attach="map"
          image={canvas}
          premultiplyAlpha
          onUpdate={(s) => (s.needsUpdate = true)}
        />
      </spriteMaterial>
    </sprite>
  );
};

export default Text;
