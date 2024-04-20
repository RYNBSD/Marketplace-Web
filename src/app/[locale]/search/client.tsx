"use client";

import type { ChangeEvent } from "react";
import { memo, useCallback, useEffect, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearch } from "./state";
import { KEYS, LOCALE } from "~/constant";
import { search as searchAction } from "~/action/store";
import { useLocale, useTranslations } from "next-intl";

const { BASE_URL } = KEYS;

export function Input() {
  const tSearch = useTranslations("Search")
  const [_, startTransition] = useTransition();
  const { search, setSearch, setState } = useSearch((state) => state);

  useEffect(() => {
    searchAction(search).then((res) => {
      if (!res.success) return;
      setState(res.data);
    });
  }, [search, setState]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      startTransition(() => {
        const { value } = e.target;
        setSearch(value.trim());
      });
    },
    [setSearch]
  );

  return (
    <input
      type="search"
      className="grow"
      placeholder={tSearch("search")}
      value={search}
      onChange={onChange}
    />
  );
}

const Store = memo(function Store({
  id,
  name,
  image,
  locale,
}: {
  id: string;
  name: string;
  image: string;
  locale: string;
}) {
  return (
    <Link
      key={id}
      href={`/${locale}/stores/${id}`}
      className="flex flex-col items-center justify-center gap-1"
    >
      <div className="avatar">
        <div className="w-24 rounded-full">
          <Image
            src={`${BASE_URL}${image}`}
            alt={name}
            width={96}
            height={96}
            loading="lazy"
            className="rounded-full"
          />
        </div>
      </div>
      <h3 className="text-lg font-semibold">{name}</h3>
    </Link>
  );
});

export function Stores() {
  const locale = useLocale();
  const { stores } = useSearch((state) => state);

  return stores.map((store: any) => (
    <Store key={store.id} locale={locale} {...store} />
  ));
}

const Category = memo(function Category({
  id,
  name,
  nameAr,
  image,
  locale,
}: {
  id: string;
  name: string;
  nameAr: string;
  image: string;
  locale: string;
}) {
  return (
    <Link
      href={`/${locale}/categories/${id}`}
      className="card card-compact w-96 bg-base-100 shadow-xl"
    >
      <figure>
        <Image
          src={`${BASE_URL}${image}`}
          alt={`${name} | ${nameAr}`}
          width={384}
          height={384}
          className="aspect-square"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{locale === LOCALE[0] ? nameAr : name}</h2>
      </div>
    </Link>
  );
});

export function Categories() {
  const locale = useLocale();
  const { categories } = useSearch((state) => state);

  return categories.map((category: any) => (
    <Category key={category.id} locale={locale} {...category} />
  ));
}

const Product = memo(function Product({
  id,
  title,
  titleAr,
  description,
  descriptionAr,
  image,
  locale,
}: {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  locale: string;
}) {
  return (
    <Link
      href={`/${locale}/products/${id}`}
      className="card card-compact w-96 bg-base-100 shadow-xl"
    >
      <figure>
        <Image
          src={`${BASE_URL}${image}`}
          alt={`${title} | ${titleAr}`}
          width={384}
          height={384}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{locale === LOCALE[0] ? titleAr : title}</h2>
        <p>{locale === LOCALE[0] ? descriptionAr : description}</p>
      </div>
    </Link>
  );
});

export function Products() {
  const locale = useLocale();
  const { products } = useSearch((state) => state);

  return products.map((product: any) => (
    <Product key={product.id} locale={locale} {...product} />
  ));
}
