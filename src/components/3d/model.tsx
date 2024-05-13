"use client";

import type { ElementRef, FC } from "react";
import type { Matrix4 } from "three";
import { memo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import PropTypes from "prop-types";
import { useModel } from "./state";
import { useHitTest, useXR } from "@react-three/xr";

const Model: FC<Props> = ({ model }) => {
  const { isPresenting } = useXR()
  const { scene } = useGLTF(isPresenting ? "/golden_globe_decoration.glb" : model);
  const meshRef = useRef<ElementRef<"mesh">>(null);
  const { state } = useModel((state) => state);

  useHitTest((hit: Matrix4) => {
    hit.decompose(
      meshRef.current!.position,
      meshRef.current!.quaternion,
      meshRef.current!.scale
    );
  });

  return (
    <mesh ref={meshRef} receiveShadow castShadow {...state}>
      <primitive object={scene} />
    </mesh>
  );
};

Model.propTypes = {
  model: PropTypes.string.isRequired,
};

type Props = {
  model: string;
};

export default memo(Model);
