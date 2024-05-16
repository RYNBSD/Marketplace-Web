"use client";
import { CategoryCard, ProductCard } from "~/components";

export function Categories({ categories }: { categories: any[] }) {
  return categories.map((category) => (
    <CategoryCard key={category.id} {...category} />
  ));
}

export function Products({ products }: { products: any[] }) {
  return products.map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
