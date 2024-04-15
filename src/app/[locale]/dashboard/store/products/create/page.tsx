import { getTranslations } from "next-intl/server";
import CreateForm from "./form";

export default async function Create() {
  const tCreate = await getTranslations("Dashboard.Store.Products.Create")
  return (
    <div>
      <h1 className="text-center text-3xl font-semibold py-5">
        {tCreate("create-product")}
      </h1>
      <CreateForm />
    </div>
  );
}
