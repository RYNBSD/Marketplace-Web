"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { KEYS, LOCALE } from "~/constant";
import { useLocale } from "next-intl";

const { BASE_URL } = KEYS;

const Category = memo(function Category({
  id,
  name,
  nameAr,
  image,
  storeId,
  locale,
}: {
  id: string;
  name: string;
  nameAr: string;
  image: string;
  storeId: string;
  locale: string;
}) {
  return (
    <Link
      href={`/${locale}/stores/${storeId}/${id}`}
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

export function Categories({ categories }: { categories: any[] }) {
  const locale = useLocale();

  return categories.map((category) => (
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
  categoryId,
  storeId,
  locale,
}: {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  categoryId: string;
  storeId: string;
  locale: string;
}) {
  return (
    <Link
      href={`/${locale}/stores/${storeId}/${categoryId}/${id}`}
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

export function Products({ products }: { products: any[] }) {
  const locale = useLocale();

  return products.map((product) => (
    <Product key={product.id} locale={locale} {...product} />
  ));
}
