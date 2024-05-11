import type { IdParam, LocalParam } from "~/types";
import { getTranslations } from "next-intl/server";
import { Category, Products } from "./client";

export default async function Page({ params: { locale } }: Props) {
  const tView = await getTranslations({
    locale,
    namespace: "Dashboard.Store.Categories.View",
  });

  return (
    <div>
      <div className="flex items-center justify-center gap-2">
        <Category />
      </div>
      <div className="divider">{tView("products")}</div>
      <div className="flex flex-wrap gap-5 w-full items-center justify-center">
        <Products />
      </div>
    </div>
  );
}

type Props = {
  params: LocalParam & IdParam;
};
