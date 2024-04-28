import dynamic from "next/dynamic";

/* Card */
export const ProductsCard = dynamic(() => import("./cards"));
export const ProductCard = dynamic(() => import("./card"));

/* Table */
export const ProductsTable = dynamic(() => import("./tables"));
export const ProductTable = dynamic(() => import("./table"));
