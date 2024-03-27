"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useCart } from "~/context";

export function NumberOfProducts() {
  const { cart } = useCart()!;

  return <>{cart.length}</>;
}

export function Info() {
  const tCart = useTranslations("Navbar.Cart");
  const { cart } = useCart()!;
  const length = cart.length;

  return (
    <>
      {length} {length === 0 ? tCart("item") : tCart("items")}
    </>
  );
}

export function TotalPrice() {
  const { cart } = useCart()!;

  const totalPrice = useMemo(
    () =>
      cart.reduce(
        (prev, current) => prev + current.quantity * current.price,
        0
      ),
    [cart]
  );

  return <>{totalPrice}</>;
}
