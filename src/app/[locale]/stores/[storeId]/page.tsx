import { request } from "~/action/fn";
import { LocalParam } from "~/types";
import { Categories, Products } from "./client";
import Image from "next/image";
import { KEYS } from "~/constant";
import { redirect } from "next/navigation";

const { BASE_URL } = KEYS;

async function fetchStore(storeId: string, locale: string) {
  const res = await request(`/api/stores/${storeId}`);
  if (!res.ok) redirect(`/${locale}/stores`);

  const json = await res.json();
  return json.data;
}

export default async function Store({ params: { locale, storeId } }: Props) {
  const { store, categories, products } = await fetchStore(storeId, locale);

  return (
    <div>
      <div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src={`${BASE_URL}${store.image}`}
            alt={store.name}
            width={150}
            height={150}
            className="rounded-full"
          />
          <h1>{store.name}</h1>
        </div>
      </div>
      <div className="divider">Categories</div>
      <div className="flex flex-wrap gap-5">
        <Categories categories={categories} />
      </div>
      <div className="divider">Products</div>
      <div className="flex flex-wrap gap-5">
        <Products products={products} />
      </div>
    </div>
  );
}

type Props = {
  params: { storeId: string } & LocalParam;
};
