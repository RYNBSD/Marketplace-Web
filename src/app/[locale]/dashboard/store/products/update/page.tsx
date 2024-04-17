import type { LocalParam } from "~/types";
import { getTranslations } from "next-intl/server";
import UpdateForm from "./form";

export default async function Create({ params: { locale } }: Props) {
  const tCreate = await getTranslations({
    locale,
    namespace: "Dashboard.Store.Products.Create",
  });

  return (
    <div>
      <h1 className="text-center text-3xl font-semibold py-5">
        {tCreate("create-product")}
      </h1>
      <UpdateForm />
    </div>
  );
}
type Props = {
  params: LocalParam;
};
