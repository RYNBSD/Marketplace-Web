"use client";

import { allProducts } from "~/api/store";
import { ProductsTable } from "~/components";

export default function Products() {
  return <ProductsTable queryFn={allProducts} />;
}
