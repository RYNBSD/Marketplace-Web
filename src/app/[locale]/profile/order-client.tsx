"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { FaTrash } from "react-icons/fa";
import useEffectOnce from "react-use/lib/useEffectOnce";
import { allOrders, deleteOrders } from "~/api/user";
import { KEYS, LOCALE } from "~/constant";

const { BASE_URL } = KEYS;

function Order({
  product,
  order,
  onDelete,
}: {
  product: any;
  order: any;
  onDelete: (id: string) => Promise<void>;
}) {
  const locale = useLocale();
  const title: string = useMemo(
    () => (locale === LOCALE[0] ? product.titleAr : product.title),
    [locale, product.title, product.titleAr]
  );
  const description: string = useMemo(
    () => (locale === LOCALE[0] ? product.descriptionAr : product.description),
    [locale, product.description, product.descriptionAr]
  );

  return (
    <div className="flex flex-col w-full gap-3 md:flex-row md:justify-between md:items-center">
      <div className="flex md:w-[80%] w-full gap-3">
        <Image
          src={`${BASE_URL}${product.images[0]}`}
          alt={`${product.title} | ${product.titleAr}`}
          loading="lazy"
          width={128}
          height={128}
          className="rounded aspect-square object-cover"
        />
        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-bold">
            {title.substring(0, 25)}
            {title.length > 25 && "..."}
          </h1>
          <p>
            {description.substring(0, 255)}
            {description.length > 255 && "..."}
          </p>
        </div>
      </div>
      <div className="flex flex-col md:w-[20%] gap-3 items-start justify-start">
        <div className="w-full flex items-center justify-between md:block">
          <h2 className="text-lg font-semibold">
            Status: <span className="font-normal">{order.status}</span>
          </h2>
          <h2 className="text-lg font-semibold">
            Quantity: <span className="font-normal">{order.quantity}</span>
          </h2>
          <h2 className="text-lg font-semibold">
            Price: <span className="font-normal">{order.totalPrice} $</span>
          </h2>
        </div>
        <button
          type="button"
          className={`btn btn-error w-full md:btn-wild ${
            (order.status === "canceled" || order.status === "done") &&
            "btn-disabled"
          }`}
          disabled={order.status === "canceled" || order.status === "done"}
          onClick={() => onDelete(`${order.id}`)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffectOnce(() => {
    allOrders()
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((json) => {
        const { orders } = json.data;
        setOrders(orders);
      });
  });

  const onDelete = useCallback(async (id: string) => {
    const res = await deleteOrders(id);
    if (res.ok)
      setOrders((orders) => [
        ...orders.map((order) => {
          if (order.order.id === id) {
            order.order.status = "canceled";
          }
          return order;
        }),
      ]);
  }, []);

  return orders.length === 0 ? (
    <div className="w-full grid place-content-center">
      <h1 className="text-center text-2xl font-bold">Empty</h1>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-5">
      {orders.map((order) => (
        <Order key={order.order.id} {...order} onDelete={onDelete} />
      ))}
    </div>
  );
}
