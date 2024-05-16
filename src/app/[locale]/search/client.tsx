"use client";

import type { ChangeEvent } from "react";
import { useCallback, useTransition } from "react";
import { useTranslations } from "next-intl";
import { useSearch } from "./state";
import { search as searchAction } from "~/action/store";
import { CategoryCard, ProductCard, StoreAvatar } from "~/components";

export function Input() {
  const tSearch = useTranslations("Search");
  const [_, startTransition] = useTransition();
  const { setState } = useSearch((state) => state);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      startTransition(() => {
        const value = e.target.value.trim();
        if (value.length === 0) return;

        searchAction(value).then((res) => {
          if (!res.success) return;
          setState(res.data);
        });
      });
    },
    [setState]
  );

  return (
    <input
      type="search"
      className="grow"
      placeholder={tSearch("search")}
      onChange={onChange}
    />
  );
}

export function Stores() {
  const { stores } = useSearch((state) => state);
  return (
    stores.length > 0 && (
      <>
        <div className="divider">Stores</div>
        <div className="flex flex-wrap gap-5 items-center justify-center">
          {stores.map((store: any) => (
            <StoreAvatar key={store.id} {...store} />
          ))}
        </div>
      </>
    )
  );
}

export function Categories() {
  const { categories } = useSearch((state) => state);
  return (
    categories.length > 0 && (
      <>
        <div className="divider">Categories</div>
        <div className="flex flex-wrap gap-5 items-center justify-center">
          {categories.map((category: any) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      </>
    )
  );
}

export function Products() {
  const { products } = useSearch((state) => state);
  return (
    products.length > 0 && (
      <>
        <div className="divider">Products</div>
        <div className="flex flex-wrap gap-5 items-start justify-center">
          {products.map((product: any) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </>
    )
  );
}
