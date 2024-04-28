"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useState } from "react";
import useEffectOnce from "react-use/lib/useEffectOnce";
import { fetchCategory } from "~/api/store";
import { ProductsTable } from "~/components";
import { KEYS, LOCALE } from "~/constant";

const { BASE_URL } = KEYS;

export function Category() {
  const locale = useLocale();
  const [category, setCategory] = useState<any>({});
  const params = useParams();

  useEffectOnce(() => {
    fetchCategory(`${params.id}`)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((json) => setCategory(json.data.category));
  });

  return (
    <>
      {category?.image && (
        <Image
          src={`${BASE_URL}${category.image}`}
          alt={`${category.name} - ${category.nameAr}`}
          width={100}
          height={100}
          priority
          className="rounded-full aspect-square"
        />
      )}
      <h1 className="text-5xl font-bold">
        {locale === LOCALE[0] ? category.nameAr : category.name}
      </h1>
    </>
  );
}

export function Products() {
  const params = useParams();

  const queryFn = useCallback(() => {
    return fetchCategory(`${params.id}`);
  }, [params.id]);

  return <ProductsTable queryFn={queryFn} />;
}
