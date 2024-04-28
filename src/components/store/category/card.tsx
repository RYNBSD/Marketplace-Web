"use client";

import { type FC, memo, useMemo } from "react";
import { useLocale } from "next-intl";
import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";
import { KEYS, LOCALE } from "~/constant";

const { BASE_URL } = KEYS;

const CategoryCard: FC<Props> = ({ id, image, storeId, ...props }) => {
  const locale = useLocale();

  const name = useMemo(
    () => (locale === LOCALE[0] ? props.nameAr : props.name),
    [locale, props.name, props.nameAr]
  );

  return (
    <Link
      href={`/${locale}/stores/${storeId}/${id}`}
      className="flex flex-col items-center justify-center gap-1"
    >
      <div className="avatar">
        <div className="w-24 rounded-xl">
          <Image
            src={`${BASE_URL}${image}`}
            alt={name}
            width={96}
            height={96}
            className="aspect-square"
          />
        </div>
      </div>
      <h2 className="text-lg font-semibold">{name}</h2>
    </Link>
  );
};

CategoryCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  nameAr: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  storeId: PropTypes.string.isRequired,
};

type Props = {
  id: string;
  name: string;
  nameAr: string;
  image: string;
  storeId: string;
};

export default memo(CategoryCard);
