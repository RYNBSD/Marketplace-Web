import Image from "next/image";
import { redirect } from "next/navigation";
import { request } from "~/action/fn";
import { KEYS, LOCALE } from "~/constant";
import { LocalParam } from "~/types";
import { Products } from "./client";

const { BASE_URL } = KEYS;

export async function fetchCategory(
  storeId: string,
  categoryId: string,
  locale: string
) {
  const res = await request(`/api/stores/${storeId}/${categoryId}`);
  if (!res.ok) redirect(`/${locale}`);

  const json = await res.json();
  return json.data;
}

export default async function Category({
  params: { locale, storeId, categoryId },
}: Props) {
  const { category, products } = await fetchCategory(
    storeId,
    categoryId,
    locale
  );

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <Image
          src={`${BASE_URL}${category.image}`}
          alt={`${category.name} - ${category.nameAr}`}
          width={150}
          height={150}
          className="rounded-full"
        />
        <h1>{locale === LOCALE[0] ? category.nameAr : category.name}</h1>
      </div>
      <div className="divider">Products</div>
      <div className="flex flex-wrap items-center justify-center gap-5">
        <Products products={products} />
      </div>
    </div>
  );
}

type Props = {
  params: LocalParam & { storeId: string; categoryId: string };
};
