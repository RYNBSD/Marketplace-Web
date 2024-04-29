"use client";
import type { IdParam, LocalParam } from "~/types";
import Image from "next/image";
import { Fragment, useState } from "react";
import { fetchProduct } from "~/api/store";
import { KEYS, LOCALE } from "~/constant";
import { Images, ThreeD } from "./client";
import useEffectOnce from "react-use/lib/useEffectOnce";

const { BASE_URL } = KEYS;

export default function Product({ params: { locale, id } }: Props) {
  const [product, setProduct] = useState<any>({});
  const [category, setCategory] = useState<any>({});

  useEffectOnce(() => {
    fetchProduct(`${id}`)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((json) => {
        setProduct(json.data.product);
        setCategory(json.data.category);
      });
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-1">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">
          {locale === LOCALE[0] ? product?.titleAr : product?.title}
        </h1>
        <p>
          {locale === LOCALE[0] ? product?.descriptionAr : product?.description}
        </p>
      </div>
      <div className="flex flex-col gap-1 items-center justify-center">
        <Images>
          <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box">
            {product?.images?.map((image: string) => (
              <div key={image} className="carousel-item">
                <Image
                  className="rounded-box aspect-square object-cover"
                  src={`${BASE_URL}${image}`}
                  alt={`${product.title - product.titleAr}`}
                  width={250}
                  height={250}
                />
              </div>
            ))}
          </div>
        </Images>
        <ThreeD model={product?.model ?? ""} />
      </div>
      <div>
        {LOCALE[1] === locale &&
          product?.infos?.map(
            (info: string) =>
              info?.length > 0 && (
                <Fragment key={info}>
                  <span key={info}>{info}</span>
                  <div className="divider" />
                </Fragment>
              )
          )}
        {LOCALE[0] === locale &&
          product?.infosAr?.map(
            (info: string) =>
              info?.length > 0 && (
                <Fragment key={info}>
                  <span key={info}>{info}</span>
                  <div className="divider" />
                </Fragment>
              )
          )}
      </div>
      <div>
        <div className="divider">Category</div>
        <div className="flex gap-2 items-center">
          {category?.image && (
            <Image
              src={`${BASE_URL}${category.image}`}
              alt={`${category.name - category.nameAr}`}
              width={50}
              height={50}
              className="rounded-full"
            />
          )}
          <h2>{category.name}</h2>
        </div>
        <div className="divider">Price</div>
        <div>{product.price}</div>
        <div className="divider">Discount</div>
        <div>{product.discount}</div>
        {product?.tags && (
          <>
            <div className="divider">Tags</div>
            <div className="flex gap-2">
              {product.tags.map(
                (tag: string) =>
                  tag?.length > 0 && (
                    <span key={tag} className="badge">
                      {tag}
                    </span>
                  )
              )}
            </div>
          </>
        )}
        {product?.sizes && (
          <>
            <div className="divider">Sizes</div>
            <div className="flex gap-2">
              {product.sizes.map(
                (size: string) =>
                  size?.length > 0 && (
                    <span key={size} className="badge">
                      {size}
                    </span>
                  )
              )}
            </div>
          </>
        )}
        {product?.colors && (
          <>
            <div className="divider">Colors</div>
            <div className="flex gap-2">
              {product.colors.map(
                (color: string) =>
                  color?.length > 0 && (
                    <span
                      key={color}
                      style={{ backgroundColor: color }}
                      className={`w-6 h-6 rounded-full`}
                    />
                  )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

type Props = {
  params: LocalParam & IdParam;
};
