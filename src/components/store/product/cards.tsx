"use client";

import { type FC, memo, useState } from "react";
import PropTypes from "prop-types";
import useEffectOnce from "react-use/lib/useEffectOnce";

const ProductsCard: FC<Props> = ({ queryFn }) => {
  const [products, setProducts] = useState([]);

  useEffectOnce(() => {
    queryFn()
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((json) => setProducts(json.data.products));
  });

  return products.length > 0;
};

ProductsCard.propTypes = {
  queryFn: PropTypes.func.isRequired,
};

type Props = {
  queryFn: () => Promise<Response>;
};

export default memo(ProductsCard);
