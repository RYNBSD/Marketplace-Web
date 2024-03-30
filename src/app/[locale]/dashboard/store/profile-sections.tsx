"use client";
import Image from "next/image";
import { deleteStore } from "~/action/store";
import { KEYS } from "~/constant";
import { useNotification } from "~/context";
import { useSeller } from "~/hooks";

const { BASE_URL } = KEYS;

export function Img() {
  const store = useSeller((state) => state.store);

  return (
    <Image
      src={`${BASE_URL}${store.image || "/upload"}`}
      alt={store.name}
      width={128}
      height={128}
      priority
      className="w-32 h-32 object-cover rounded-full"
    />
  );
}

export function Name() {
  const store = useSeller((state) => state.store);
  return (
    <input
      type="text"
      value={store.name}
      disabled
      className="grow"
      placeholder="username"
    />
  );
}

export function DeleteBtn() {
  const { toastify } = useNotification()!;
  return (
    <button
      type="button"
      className="btn btn-error capitalize"
      onClick={() => toastify(deleteStore())}
    >
      Delete
    </button>
  );
}
