import type { Locale } from "~/types";
import { getTranslations } from "next-intl/server";
import UpdateForm from "./form";

export default async function Page({
  searchParams,
  params: { locale },
}: Props) {
  const tUpdate = await getTranslations({
    locale,
    namespace: "Dashboard.Store.Categories.Update",
  });

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">{tUpdate("update-category")}</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <UpdateForm {...searchParams} />
        </div>
      </div>
    </div>
  );
}

type Props = {
  searchParams: {
    id: string;
    name: string;
    nameAr: string;
  };
  params: {
    locale: Locale;
  };
};
