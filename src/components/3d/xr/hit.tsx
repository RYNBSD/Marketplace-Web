"use client";

import type { ElementRef } from "react";
import type { Matrix4 } from "three";
import {
  Interactive,
  useHitTest,
  useXR,
  type XRInteractionEvent,
} from "@react-three/xr";
import { useCallback, useRef } from "react";
import { useModel } from "../state";

export default function Hit() {
  const meshRef = useRef<ElementRef<"mesh">>(null);
  const { setState } = useModel((state) => state);

  const { isPresenting } = useXR();
  const onSelect = useCallback(
    (e: XRInteractionEvent) => {
      const position = e.intersection?.object.position.clone();
      setState({ position });
    },
    [setState]
  );

  useHitTest((hit: Matrix4) => {
    hit.decompose(
      meshRef.current!.position,
      meshRef.current!.quaternion,
      meshRef.current!.scale
    );
    meshRef.current!.rotation.set(-Math.PI / 2, 0, 0);
  });

  return isPresenting ? (
    <Interactive
      onSelect={onSelect}
      onMove={() => {
        console.log("Move");
      }}
    >
      <mesh ref={meshRef} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[0.1, 0.25, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </Interactive>
  ) : null;
}
