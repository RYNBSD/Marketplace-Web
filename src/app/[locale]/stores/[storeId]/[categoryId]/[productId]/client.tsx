"use client";
import { memo, useCallback, type ReactNode } from "react";
import { useState } from "./state";
import { useIsMobile } from "~/hooks";
import { Canvas3D } from "~/components";
import { KEYS } from "~/constant";
import { useTranslations } from "next-intl";
import { useCart } from "~/context";

const { BASE_URL } = KEYS;

export const ThreeD = memo(function ThreeD({ model }: { model: string }) {
  const isMobile = useIsMobile();
  const { is3D, isAr, toggle3D, toggleAr } = useState((state) => state);

  return (
    is3D && (
      <>
        <div className="h-[250px] w-full grid place-content-center">
          <Canvas3D ar={isAr} model={`${BASE_URL}${model}`} />
        </div>
        <div className="flex gap-2 items-center justify-center">
          <button
            type="button"
            className="btn btn-info flex-1"
            onClick={toggle3D}
          >
            Images
          </button>
          <button
            type="button"
            className="btn btn-info flex-1"
            disabled={!isMobile}
            onClick={toggleAr}
          >
            AR
          </button>
        </div>
      </>
    )
  );
});

export function Images({
  children,
  hasModel,
}: {
  children: ReactNode;
  hasModel: boolean;
}) {
  const { is3D, toggle3D } = useState((state) => state);
  return (
    !is3D && (
      <>
        {children}
        <button
          type="button"
          className="btn btn-info"
          disabled={!hasModel}
          onClick={toggle3D}
        >
          3D
        </button>
      </>
    )
  );
}

export function OrderBtn(props: {
  id: string;
  image: string;
  title: string;
  titleAr: string;
  price: number;
}) {
  const t = useTranslations();
  const { cart, addToCart, changeQuantityOfProduct } = useCart()!;

  const onClick = useCallback(() => {
    for (const c of cart) {
      if (c.id === props.id) {
        changeQuantityOfProduct(c.id, 1);
        return;
      }
    }
    addToCart({ ...props, quantity: 1 });
  }, [addToCart, cart, changeQuantityOfProduct, props]);

  return (
    <button
      className="btn btn-primary w-full my-1"
      type="button"
      onClick={onClick}
    >
      Order
    </button>
  );
}
