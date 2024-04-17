"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { fetchProduct } from "~/action/store";
import { Canvas3D } from "~/components";
import { KEYS, LOCALE } from "~/constant";
import { useIsMobile } from "~/hooks";

const { BASE_URL } = KEYS;

export default function Product() {
  const locale = useLocale();
  const isMobile = useIsMobile();
  const params = useParams();
  const [product, setProduct] = useState<any>({});
  const [state, setState] = useState({
    is3D: false,
    ar: false,
  });

  useEffect(() => {
    fetchProduct(`${params.id}`).then((res) => {
      if (res.success) setProduct(res.data);
    });
  }, [params.id]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-1">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">
          {locale === LOCALE[1]
            ? product?.product?.title
            : product?.product?.title}
        </h1>
        <p>
          {locale === LOCALE[0]
            ? product?.product?.descriptionAr
            : product?.product?.description}
        </p>
      </div>
      <div className="flex flex-col gap-1 items-center justify-center">
        {!state.is3D && (
          <>
            <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box">
              {product?.product?.images.map((image: string) => (
                <div key={image} className="carousel-item">
                  <Image
                    className="rounded-box aspect-square object-cover"
                    src={`${BASE_URL}${image}`}
                    alt={`${
                      product?.product?.title - product?.product?.titleAr
                    }`}
                    width={250}
                    height={250}
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-info"
              onClick={() => setState((prev) => ({ ...prev, is3D: true }))}
            >
              3D
            </button>
          </>
        )}
        {state.is3D && (
          <>
            <div className="h-[250px] w-[250px]">
              <Canvas3D
                ar={state.ar}
                model={`${BASE_URL}${product?.product?.model ?? ""}`}
              />
            </div>
            <div className="flex gap-1">
              <button
                type="button"
                className="btn btn-info flex-1"
                onClick={() =>
                  setState((prev) => ({ ...prev, is3D: false, ar: false }))
                }
              >
                Images
              </button>
              <button
                type="button"
                className="btn btn-info flex-1"
                disabled={!isMobile}
                onClick={() => setState((prev) => ({ ...prev, ar: true }))}
              >
                AR
              </button>
            </div>
          </>
        )}
      </div>
      <div>
        {LOCALE[1] === locale &&
          product?.product?.infos.map((info: string) => (
            <Fragment key={info}>
              <span key={info}>{info}</span>
              <div className="divider" />
            </Fragment>
          ))}
        {LOCALE[0] === locale &&
          product?.product?.infosAr.map((info: string) => (
            <Fragment key={info}>
              <span key={info}>{info}</span>
              <div className="divider" />
            </Fragment>
          ))}
      </div>
      <div>
        <div className="divider">Category</div>
        <div className="flex gap-2 items-center">
          {product?.category?.image && (
            <Image
              src={`${BASE_URL}${product.category.image ?? ""}`}
              alt={`${product.category.name - product.category.nameAr}`}
              width={50}
              height={50}
              className="rounded-full"
            />
          )}
          <h2>{product?.category?.name}</h2>
        </div>
        {product?.product?.tags && (
          <>
            <div className="divider">Tags</div>
            <div className="flex gap-2">
              {product.product.tags.map((tag: string) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </>
        )}
        {product?.product?.sizes && (
          <>
            <div className="divider">Sizes</div>
            <div className="flex gap-2">
              {product.product.sizes.map((size: string) => (
                <span key={size}>{size}</span>
              ))}
            </div>
          </>
        )}
        {product?.product?.colors && (
          <>
            <div className="divider">Colors</div>
            <div className="flex gap-2">
              {product.product.colors.map((color: string) => (
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
