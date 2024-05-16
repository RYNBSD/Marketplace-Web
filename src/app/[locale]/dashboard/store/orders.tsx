"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { FaTrash } from "react-icons/fa";
import useEffectOnce from "react-use/lib/useEffectOnce";
import { allOrders, patchOrders } from "~/api/store";
import { KEYS, LOCALE } from "~/constant";
import { MdLocalShipping, MdDone } from "react-icons/md";

const { BASE_URL } = KEYS;

function Order({
  product,
  order,
  onProcess,
  onCancel,
  onDone,
}: {
  product: any;
  order: any;
  onProcess: (id: string) => Promise<void>;
  onCancel: (id: string) => Promise<void>;
  onDone: (id: string) => Promise<void>;
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
      <div className="flex md:w-[70%] w-full gap-3">
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
      <div className="flex flex-col gap-3 md:w-[30%] items-start justify-start">
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
        <div className="flex w-full items-center justify-center">
          <button
            type="button"
            className={`btn btn-error w-full flex-1 md:btn-wild ${
              (order.status === "canceled" || order.status === "done") &&
              "btn-disabled"
            }`}
            disabled={order.status === "canceled" || order.status === "done"}
            onClick={() => onCancel(`${order.id}`)}
          >
            <FaTrash />
          </button>
          <button
            type="button"
            className={`btn btn-info w-full flex-1 md:btn-wild ${
              (order.status === "process" ||
                order.status === "canceled" ||
                order.status === "done") &&
              "btn-disabled"
            }`}
            disabled={
              order.status === "process" ||
              order.status === "canceled" ||
              order.status === "done"
            }
            onClick={() => onProcess(`${order.id}`)}
          >
            <MdLocalShipping />
          </button>
          <button
            type="button"
            className={`btn btn-success w-full flex-1 md:btn-wild ${
              (order.status === "done" || order.status === "canceled") &&
              "btn-disabled"
            }`}
            disabled={order.status === "done" || order.status === "canceled"}
            onClick={() => onDone(`${order.id}`)}
          >
            <MdDone />
          </button>
        </div>
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

  const onCancel = useCallback(async (id: string) => {
    const res = await patchOrders(id, "canceled");
    if (res.ok)
      setOrders((prev) => [
        ...prev.map((order) => {
          if (order.order.id === id) {
            order.order.status = "canceled";
          }
          return order;
        }),
      ]);
  }, []);

  const onProcess = useCallback(async (id: string) => {
    const res = await patchOrders(id, "process");
    if (res.ok)
      setOrders((prev) => [
        ...prev.map((order) => {
          if (order.order.id === id) {
            order.order.status = "process";
          }
          return order;
        }),
      ]);
  }, []);

  const onDone = useCallback(async (id: string) => {
    const res = await patchOrders(id, "done");
    if (res.ok)
      setOrders((prev) => [
        ...prev.map((order) => {
          if (order.order.id === id) {
            order.order.status = "done";
          }
          return order;
        }),
      ]);
  }, []);

  return orders.length === 0 ? (
    <div className="flex items-center justify-center w-full h-full">
      <h1 className="text-xl font-bold text-center">Empty</h1>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-5">
      {orders.map((order) => (
        <Order
          key={order.order.id}
          {...order}
          onProcess={onProcess}
          onCancel={onCancel}
          onDone={onDone}
        />
      ))}
    </div>
  );
}
