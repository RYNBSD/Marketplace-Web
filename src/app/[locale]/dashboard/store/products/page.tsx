import type { LocalParam } from "~/types";
import { getTranslations } from "next-intl/server";

import Products from "./products";
import Link from "next/link";

export default async function page({ params: { locale } }: Props) {
  const tProducts = await getTranslations({
    locale,
    namespace: "Dashboard.Store.Products",
  });

  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="font-bold text-5xl">{tProducts("products")}</h1>
        <div className="flex gap-5">
          <Link
            href={`/${locale}/dashboard/store/products/create`}
            className="btn btn-success"
          >
            {tProducts("create")}
          </Link>
        </div>
        <Products />
      </div>
    </div>
  );
}

type Props = {
  params: LocalParam;
};
