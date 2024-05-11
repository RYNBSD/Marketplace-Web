"use client";

import { type FC, memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import useEffectOnce from "react-use/lib/useEffectOnce";
import { ProductTable } from ".";
import { deleteProduct } from "~/api/store";
import { useTranslations } from "next-intl";

const ProductsTable: FC<Props> = ({ queryFn }) => {
  const t = useTranslations();
  const tTables = useTranslations("Dashboard.Store.Products.Tables");
  const [products, setProducts] = useState<any[]>([]);

  useEffectOnce(() => {
    queryFn?.()
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((json) => {
        setProducts(json.data.products);
      });
  });

  const onDelete = useCallback(async (id: string) => {
    const res = await deleteProduct(id);
    if (res.ok)
      setProducts((prev) => prev.filter((product) => product.id !== id));
  }, []);

  return products.length === 0 ? (
    <div className="w-full h-screen grid place-content-center">
      <h1 className="text-5xl font-bold">{t("empty")}</h1>
    </div>
  ) : (
    <div className="overflow-x-auto w-full mt-5">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>{tTables("title")}</th>
            <th>{tTables("views")}</th>
            <th>{tTables("orders")}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: any) => (
            <ProductTable key={product.id} onDelete={onDelete} {...product} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

ProductsTable.propTypes = {
  queryFn: PropTypes.func.isRequired,
};

type Props = {
  queryFn: () => Promise<Response>;
};

export default memo(ProductsTable);
