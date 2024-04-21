import type {
  CategoryIdParam,
  LocalParam,
  ProductIdParam,
  StoreIdParam,
} from "~/types";
import { redirect } from "next/navigation";
import { request } from "~/action/fn";
import Image from "next/image";
import { Fragment } from "react";
import { KEYS, LOCALE } from "~/constant";
import { Images, OrderBtn, ThreeD } from "./client";

const { BASE_URL } = KEYS;

async function fetchProduct(
  storeId: string,
  categoryId: string,
  productId: string,
  locale: string
) {
  const res = await request(
    `/api/stores/${storeId}/${categoryId}/${productId}`
  );
  if (!res.ok) redirect(`/${locale}`);

  const json = await res.json();
  return json.data.product;
}

export default async function Product({
  params: { storeId, categoryId, productId, locale },
}: Props) {
  const { product, category } = await fetchProduct(
    storeId,
    categoryId,
    productId,
    locale
  );

  const discountPrice = product.price - (product.discount * product.price) / 100

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
        <Images hasModel={!!product.model}>
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
        {product.model && <ThreeD model={product.model} />}
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
        <div className="divider">Price</div>
        <div>{product.price}</div>
        <div className="divider">Discount</div>
        <div>{discountPrice}</div>
        {product.tags && (
          <>
            <div className="divider">Tags</div>
            <div className="flex gap-2">
              {product.tags.map((tag: string) => (
                <span key={tag} className="badge">
                  {tag}
                </span>
              ))}
            </div>
          </>
        )}
        {product.sizes && (
          <>
            <div className="divider">Sizes</div>
            <div className="flex gap-2">
              {product.sizes.map((size: string) => (
                <span key={size} className="badge">
                  {size}
                </span>
              ))}
            </div>
          </>
        )}
        {product.colors && (
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
        <OrderBtn
          id={product.id}
          title={product.title}
          titleAr={product.titleAr}
          image={product.images[0]}
          price={!!product.discount ? discountPrice : product.price}
        />
      </div>
    </div>
  );
}

type Props = {
  params: StoreIdParam & CategoryIdParam & ProductIdParam & LocalParam;
};
