import dynamic from "next/dynamic";

export const QueryProvider = dynamic(() => import("./query"));
