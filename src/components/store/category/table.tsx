"use client";

import { type FC, memo, useMemo } from "react";
import PropTypes from "prop-types";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaPen, FaEye, FaTrash } from "react-icons/fa";
import { KEYS, LOCALE } from "~/constant";

const { BASE_URL } = KEYS;

const CategoryTable: FC<Props> = ({
  id,
  image,
  products,
  views,
  onDelete,
  ...props
}) => {
  const locale = useLocale();
  const name = useMemo(
    () => (locale === LOCALE[0] ? props.nameAr : props.name),
    [locale, props.name, props.nameAr]
  );

  return (
    <tr>
      <td>
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <Image
              src={`${BASE_URL}${image}`}
              alt={name}
              width={48}
              height={48}
            />
          </div>
        </div>
      </td>
      <td>{name}</td>
      <td>{views}</td>
      <td>{products}</td>
      <td>
        <div className="w-full flex items-center justify-center">
          <Link
            href={`/${locale}/dashboard/store/categories/${id}`}
            className="btn btn-neutral flex-1"
          >
            <FaEye />
          </Link>
          <Link
            href={`/${locale}/dashboard/store/categories/update?id=${encodeURIComponent(
              id
            )}&name=${encodeURIComponent(
              props.name
            )}&nameAr=${encodeURIComponent(props.nameAr)}`}
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

CategoryTable.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  nameAr: PropTypes.string.isRequired,
  products: PropTypes.string.isRequired,
  views: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

type Props = {
  id: string;
  image: string;
  name: string;
  nameAr: string;
  products: string;
  views: string;
  onDelete: (id: string) => void;
};

export default memo(CategoryTable);
