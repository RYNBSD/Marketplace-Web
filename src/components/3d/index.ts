import dynamic from "next/dynamic";

export const Canvas3D = dynamic(() => import("./canvas-3d"), { ssr: false })
