"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { allCategories, deleteCategory } from "~/action/store";
import { KEYS } from "~/constant";

const { BASE_URL } = KEYS;

export default function Categories() {
  const locale = useLocale();
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    allCategories(1).then((res) => {
      if (res.success) setCategories(res.data.categories);
    });
  }, []);

  const remove = useCallback((id: string) => {
    deleteCategory(`${id}`).then(({ success }) => {
      if (success)
        setCategories((prev) => prev.filter((category) => category.id !== id));
    });
  }, []);

  return (
    <div className="flex justify-center flex-wrap gap-5">
      {categories.map((category: any) => (
        <Category
          key={category.id}
          {...category}
          locale={locale}
          remove={remove}
        />
      ))}
    </div>
  );
}

const Category = memo(function Category({
  id,
  image,
  name,
  nameAr,
  locale,
  remove,
}: CategoryProps) {
  const tOptions = useTranslations("Dashboard.Store.Categories.Options")
  const lang = useMemo(
    () => (locale === "en" ? name : nameAr),
    [locale, name, nameAr]
  );

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <Image
          src={`${BASE_URL}${image}`}
          alt={lang}
          width={384}
          height={100}
          loading="lazy"
          className="object-cover aspect-square"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{lang}</h2>
        <div className="flex gap-1">
          <Link
            className="btn flex-1"
            href={`/${locale}/dashboard/store/categories/${id}`}
          >
            {tOptions("view")}
          </Link>
          <Link
            href={`/${locale}/dashboard/store/categories/update?id=${encodeURIComponent(
              id
            )}&name=${encodeURIComponent(name)}&nameAr=${encodeURIComponent(
              nameAr
            )}`}
            className="btn btn-info flex-1"
          >
            {tOptions("update")}
          </Link>
          <button
            type="button"
            className="btn btn-error flex-1"
            onClick={() => remove(id)}
          >
            {tOptions("delete")}
          </button>
        </div>
      </div>
    </div>
  );
});

type CategoryProps = {
  id: string;
  image: string;
  name: string;
  nameAr: string;
  locale: string;
  remove: (id: string) => void;
};
