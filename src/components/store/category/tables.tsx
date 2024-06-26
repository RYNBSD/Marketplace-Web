"use client";

import { type FC, memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import useEffectOnce from "react-use/lib/useEffectOnce";
import { deleteCategory } from "~/api/store";
import CategoryTable from "./table";
import { useTranslations } from "next-intl";

const CategoriesTable: FC<Props> = ({ queryFn }) => {
  const t = useTranslations()
  const tTables = useTranslations("Dashboard.Store.Categories.Tables")
  const [categories, setCategories] = useState<any[]>([]);

  useEffectOnce(() => {
    queryFn?.()
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((json) => setCategories(json.data.categories));
  });

  const onDelete = useCallback(async (id: string) => {
    const res = await deleteCategory(id);
    if (res.ok)
      setCategories((prev) => prev.filter((category) => category.id !== id));
  }, []);

  return categories.length === 0 ? (
    <div className="w-full h-screen grid place-content-center">
      <h1 className="text-5xl font-bold">{t("empty")}</h1>
    </div>
  ) : (
    <div className="overflow-x-auto w-full mt-5">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>{tTables("name")}</th>
            <th>{tTables("views")}</th>
            <th>{tTables("products")}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category: any) => (
            <CategoryTable
              key={category.id}
              onDelete={onDelete}
              {...category}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

CategoriesTable.propTypes = {
  queryFn: PropTypes.func.isRequired,
};

type Props = {
  queryFn: () => Promise<Response>;
};

export default memo(CategoriesTable);
