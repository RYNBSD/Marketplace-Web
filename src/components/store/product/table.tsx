"use client";

import { type FC, memo, useMemo } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { useLocale } from "next-intl";
import Link from "next/link";
import { FaPen, FaEye, FaTrash } from "react-icons/fa";
import { KEYS, LOCALE } from "~/constant";

const { BASE_URL } = KEYS;

const ProductTable: FC<Props> = ({
  id,
  images,
  views,
  orders,
  onDelete,
  ...props
}) => {
  const locale = useLocale();
  const title = useMemo(
    () => (locale === LOCALE[0] ? props.titleAr : props.title),
    [locale, props.title, props.titleAr]
  );

  return (
    <tr>
      <td>
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <Image
              src={`${BASE_URL}${images[0]}`}
              alt={title}
              width={48}
              height={48}
            />
          </div>
        </div>
      </td>
      <td>{title}</td>
      <td>{views}</td>
      <td>{orders}</td>
      <td>
        <div className="w-full flex items-center justify-center">
          <Link
            href={`/${locale}/dashboard/store/products/${id}`}
            className="btn btn-neutral flex-1"
          >
            <FaEye />
          </Link>
          <Link
            href={`/${locale}/dashboard/store/products/update?id=${id}`}
            className="btn btn-info flex-1"
          >
            <FaPen />
          </Link>
          <button
            type="button"
            className="btn btn-error flex-1"
            onClick={() => onDelete(id)}
          >
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );
};

ProductTable.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  titleAr: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  views: PropTypes.string.isRequired,
  orders: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

type Props = {
  id: string;
  title: string;
  titleAr: string;
  images: string[];
  views: string;
  orders: string;
  onDelete: (id: string) => Promise<void>;
};

export default memo(ProductTable);
