import type { LocalParam } from "~/types";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Categories from "./categories";

export default async function Page({ params: { locale } }: Props) {
  const tCategories = await getTranslations({
    locale,
    namespace: "Dashboard.Store.Categories",
  });

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between py-5">
        <h1 className="font-bold text-5xl">{tCategories("categories")}</h1>
        <Link
          href={`/${locale}/dashboard/store/categories/create`}
          className="btn btn-success"
        >
          {tCategories("create")}
        </Link>
      </div>
      <Categories />
    </div>
  );
}

type Props = {
  params: LocalParam;
};
