import type { IdParam, LocalParam } from "~/types";
import Image from "next/image";
import { Fragment } from "react";
import { fetchProduct } from "~/action/store";
import { KEYS, LOCALE } from "~/constant";
import { Images, ThreeD } from "./client";
import { notFound } from "next/navigation";

const { BASE_URL } = KEYS;

export default async function Product({ params: { locale, id } }: Props) {
  const res = await fetchProduct(`${id}`);
  if (!res.success) return notFound();
  const { product, category } = res.data;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-1">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">
          {locale === LOCALE[1] ? product.title : product.title}
        </h1>
        <p>
          {locale === LOCALE[0] ? product.descriptionAr : product.description}
        </p>
      </div>
      <div className="flex flex-col gap-1 items-center justify-center">
        <Images>
          <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box">
            {product.images.map((image: string) => (
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
        <ThreeD model={product.model} />
      </div>
      <div>
        {LOCALE[1] === locale &&
          product.infos.map((info: string) => (
            <Fragment key={info}>
              <span key={info}>{info}</span>
              <div className="divider" />
            </Fragment>
          ))}
        {LOCALE[0] === locale &&
          product.infosAr.map((info: string) => (
            <Fragment key={info}>
              <span key={info}>{info}</span>
              <div className="divider" />
            </Fragment>
          ))}
      </div>
      <div>
        <div className="divider">Category</div>
        <div className="flex gap-2 items-center">
          <Image
            src={`${BASE_URL}${category.image}`}
            alt={`${category.name - category.nameAr}`}
            width={50}
            height={50}
            className="rounded-full"
          />
          <h2>{category.name}</h2>
        </div>
        {product?.tags && (
          <>
            <div className="divider">Tags</div>
            <div className="flex gap-2">
              {product.tags.map((tag: string) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </>
        )}
        {product?.sizes && (
          <>
            <div className="divider">Sizes</div>
            <div className="flex gap-2">
              {product.sizes.map((size: string) => (
                <span key={size}>{size}</span>
              ))}
            </div>
          </>
        )}
        {product?.colors && (
          <>
            <div className="divider">Colors</div>
            <div className="flex gap-2">
              {product.colors.map((color: string) => (
                <span
                  key={color}
                  style={{ backgroundColor: color }}
                  className={`w-6 h-6 rounded-full`}
                />
              ))}
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
