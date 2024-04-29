"use client";

import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useSetting } from "~/context";
import { useXR } from "@react-three/xr";

export default function Camera() {
  const { isPresenting } = useXR()
  const { setting } = useSetting()!;

  return (
    <>
      <OrbitControls
        autoRotate={!setting.disableAnimations && !isPresenting} // Auto-rotate the model
        enableZoom={true} // Enable zoom
        maxPolarAngle={Math.PI / 2} // Limit the angle to prevent flipping
        minPolarAngle={0} // Limit the angle to prevent flipping
        minDistance={1} // Limit the minimum distance of zoom
        maxDistance={10} // Limit the maximum distance of zoom
      />
      <PerspectiveCamera makeDefault position={[0, 1, 2.5]} />
    </>
  );
};
