"use client";

import { allCategories } from "~/api/store";
import { CategoriesTable } from "~/components";

export default function Categories() {
  return <CategoriesTable queryFn={allCategories} />;
}
