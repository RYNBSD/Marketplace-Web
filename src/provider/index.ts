import dynamic from "next/dynamic";

export const QueryClientProvider = dynamic(() => import("./query-client"));
