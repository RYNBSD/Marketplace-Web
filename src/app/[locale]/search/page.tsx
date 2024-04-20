import type { LocalParam } from "~/types";
import { Categories, Input, Products, Stores } from "./client";
import { getTranslations } from "next-intl/server";

export default async function Search({ params: { locale } }: Props) {
  const tSearch = await getTranslations({ locale, namespace: "Search" });

  return (
    <div>
      <h1 className="text-5xl font-bold text-center mb-5">{tSearch("search")}</h1>
      <label className="input input-bordered flex items-center gap-2">
        <Input />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      <div className="divider">Stores</div>
      <div className="flex flex-wrap gap-5 items-center justify-center">
        <Stores />
      </div>
      <div className="divider">Categories</div>
      <div className="flex flex-wrap gap-5 items-center justify-center">
        <Categories />
      </div>
      <div className="divider">Products</div>
      <div className="flex flex-wrap gap-5 items-center justify-center">
        <Products />
      </div>
    </div>
  );
}

type Props = {
  params: LocalParam;
};
