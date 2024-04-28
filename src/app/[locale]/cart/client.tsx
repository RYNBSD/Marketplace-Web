"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { createOrder } from "~/api/user";
import { KEYS, LOCALE } from "~/constant";
import { useCart } from "~/context";

const { BASE_URL } = KEYS;

export function Orders() {
  const locale = useLocale();
  const { cart } = useCart()!;

  return cart.map((c) => (
    <div key={c.id} className="w-full flex justify-between items-center">
      <div>
        <Image
          src={`${BASE_URL}${c.image}`}
          alt={`${c.title} | ${c.titleAr}`}
          width={150}
          height={150}
          className="rounded"
        />
      </div>
      <div>
        <h1>{locale === LOCALE[0] ? c.titleAr : c.title}</h1>
        <h2>Quantity: {c.quantity}</h2>
        <h2>Price: {c.price}</h2>
      </div>
    </div>
  ));
}

export function OrderBtn() {
  const locale = useLocale()
  const router = useRouter()
  const { cart } = useCart()!;

  const onClick = useCallback(async () => {
    const orders = cart.map((c) => ({
      productId: c.id,
      quantity: c.quantity,
      totalPrice: c.quantity * c.price,
    }));

    await createOrder(orders)
    router.push(`/${locale}`)
  }, [cart, locale, router]);

  return <button type="button" onClick={onClick}></button>;
}
