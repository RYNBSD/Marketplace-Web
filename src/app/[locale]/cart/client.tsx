"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { createOrder } from "~/api/user";
import { KEYS, LOCALE } from "~/constant";
import { useCart } from "~/context";
import { FaTrash } from "react-icons/fa";

const { BASE_URL } = KEYS;

export function Orders() {
  const locale = useLocale();
  const { cart, removeFromCart, changeQuantityOfProduct } = useCart()!;

  return cart.length > 0 ? (
    cart.map((c) => (
      <div key={c.id} className="w-full flex justify-around items-center">
        <div className="flex gap-5 items-start">
          <Image
            src={`${BASE_URL}${c.image}`}
            alt={`${c.title} | ${c.titleAr}`}
            width={150}
            height={150}
            className="rounded aspect-square object-cover"
          />
          <div>
            <h1 className="font-bold text-2xl">
              {locale === LOCALE[0] ? c.titleAr : c.title}
            </h1>
            <h2 className="text-lg">{c.price} $</h2>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex items-center justify-center">
            <button
              type="button"
              className="btn btn-neutral"
              onClick={() =>
                c.quantity === 1 ? null : changeQuantityOfProduct(c.id, -1)
              }
            >
              -
            </button>
            <h2 className="m-2">{c.quantity}</h2>
            <button
              type="button"
              className="btn btn-neutral"
              onClick={() => changeQuantityOfProduct(c.id, 1)}
            >
              +
            </button>
          </div>
          <button
            type="button"
            className="btn btn-error"
            onClick={() => removeFromCart(c.id)}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    ))
  ) : (
    <section className="w-full h-screen grid place-content-center">
      <h1 className="text-5xl font-bold text-center">Empty</h1>
    </section>
  );
}

export function OrderBtn() {
  const locale = useLocale();
  const router = useRouter();
  const { cart } = useCart()!;

  const onClick = useCallback(async () => {
    const orders = cart.map((c) => ({
      productId: c.id,
      quantity: c.quantity,
      totalPrice: c.quantity * c.price,
    }));

    
    await createOrder(orders);
    router.push(`/${locale}/cart/buy`);
  }, [cart, locale, router]);

  return (
    cart.length > 0 && (
      <button type="button" className="btn btn-primary btn-wide" onClick={onClick}>
        Buy
      </button>
    )
  );
}
