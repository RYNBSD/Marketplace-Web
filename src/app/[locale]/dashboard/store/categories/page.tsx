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
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="font-bold text-5xl">{tCategories("categories")}</h1>
        <div className="flex gap-5">
          <Link
            href={`/${locale}/dashboard/store/categories/create`}
            className="btn btn-success"
          >
            {tCategories("create")}
          </Link>
        </div>
        <div className="flex justify-center flex-wrap gap-5">
          <Categories />
        </div>
      </div>
    </div>
  );
}

type Props = {
  params: LocalParam;
};
