"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { allProducts, deleteProduct } from "~/action/store";
import { KEYS } from "~/constant";

const { BASE_URL } = KEYS;

export default function Products() {
  const locale = useLocale();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    allProducts().then((res) => {
      if (res.success) setProducts(res.data.products);
    });
  }, []);

  const remove = useCallback(async (id: string) => {
    const res = await deleteProduct(id)
    // @ts-ignore
    if (res.success) setProducts(prev => prev.filter(product => product.id !== id))
    return res
  }, []);

  return (
    <div className="flex justify-center flex-wrap gap-5">
      {products.map((product: any) => (
        <Product
          key={product.id}
          {...product}
          locale={locale}
          remove={remove}
        />
      ))}
    </div>
  );
}

const Product = memo(function Product({
  id,
  images,
  locale,
  remove,
  ...props
}: ProductProps) {
  const tOptions = useTranslations("Dashboard.Store.Products.Options")
  const title = useMemo(
    () => (locale === "en" ? props.title : props.titleAr),
    [locale, props.title, props.titleAr]
  );

  const description = useMemo(
    () => (locale === "en" ? props.description : props.descriptionAr),
    [locale, props.description, props.descriptionAr]
  );

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <Image
          src={`${BASE_URL}${images[0]}`}
          alt={title}
          width={384}
          height={100}
          loading="lazy"
          className="object-cover aspect-square"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title.substring(0, 20)}</h2>
        <p>{description.substring(0, 255)}</p>
        <div className="flex gap-1">
          <Link
            className="btn flex-1"
            href={`/${locale}/dashboard/store/products/${id}`}
          >
            {tOptions("view")}
          </Link>
          <Link
            href={`/${locale}/dashboard/store/products/update`}
            className="btn btn-info flex-1"
          >
            {tOptions("update")}
          </Link>
          <button
            type="button"
            className="btn btn-error flex-1"
            onClick={() => remove(id)}
          >
            {tOptions("delete")}
          </button>
        </div>
      </div>
    </div>
  );
});

type ProductProps = {
  id: string;
  description: string;
  descriptionAr: string;
  title: string;
  titleAr: string;
  images: string[];
  locale: string;
  remove: (id: string) => Promise<void>;
};
