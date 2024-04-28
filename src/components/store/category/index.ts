import dynamic from "next/dynamic";

/* Card */
export const CategoryCard = dynamic(() => import("./card"));

/* Table */
export const CategoryTable = dynamic(() => import("./table"));
export const CategoriesTable = dynamic(() => import("./tables"));
