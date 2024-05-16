"use client"
import { ProductCard } from "~/components";

export function Products({ products }: { products: any[] }) {
  return products.map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}