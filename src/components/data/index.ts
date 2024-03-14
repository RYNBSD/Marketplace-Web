import dynamic from "next/dynamic";

export const Csrf = dynamic(() => import("./csrf"));
