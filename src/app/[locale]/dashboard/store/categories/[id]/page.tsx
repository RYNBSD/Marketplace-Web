import { getTranslations } from "next-intl/server";
import { fetchCategory } from "~/action/store";
import type { IdParam, LocalParam } from "~/types";
import { Products } from "./client";
import Image from "next/image";
import { KEYS, LOCALE } from "~/constant";

const { BASE_URL } = KEYS

export default async function Category({ params: { locale, id } }: Props) {
  const [res, tCategory] = await Promise.all([
    fetchCategory(id),
    getTranslations({ locale, namespace: "" }),
  ]);

  if (!res.success) return "Error";

  const { category, products } = res.data;

  return (
    <div>
      <div className="flex items-center justify-center gap-2">
        <Image
          src={`${BASE_URL}${category.image}`}
          alt={`${category.name} - ${category.nameAr}`}
          width={100}
          height={100}
          priority
          className="rounded-full aspect-square"
        />
        <h1 className="text-5xl font-bold">{locale === LOCALE[0] ? category.nameAr : category.name}</h1>
      </div>
      <div className="divider">Products</div>
      <div className="flex flex-wrap gap-5 w-full items-center justify-center">
        <Products locale={locale} products={products} />
      </div>
    </div>
  );
}

type Props = {
  params: LocalParam & IdParam;
};
