import type { LocalParam } from "~/types";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Products from "./client";

export default async function page({ params: { locale } }: Props) {
  const tProducts = await getTranslations({
    locale,
    namespace: "Dashboard.Store.Products",
  });

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="flex w-full items-center justify-between py-5">
        <h1 className="font-bold text-5xl">{tProducts("products")}</h1>
        <Link
          href={`/${locale}/dashboard/store/products/create`}
          className="btn btn-success"
        >
          {tProducts("create")}
        </Link>
      </div>
      <Products />
    </div>
  );
}

type Props = {
  params: LocalParam;
};
