"use client";

import type { ReactNode } from "react";
import { XR as XRCanvas } from "@react-three/xr";

export default function XR({ children }: Props) {
  return <XRCanvas referenceSpace="viewer">{children}</XRCanvas>;
}

type Props = {
  children: ReactNode;
};
