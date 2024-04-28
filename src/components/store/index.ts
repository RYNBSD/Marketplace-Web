import dynamic from "next/dynamic";

export * from "./product";
export * from "./category";

export const StoreAvatar = dynamic(() => import("./avatar"));
