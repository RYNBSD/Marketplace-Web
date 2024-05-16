"use client";

import { type FC, memo, useMemo } from "react";
import { useLocale } from "next-intl";
import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";
import { KEYS, LOCALE } from "~/constant";

const { BASE_URL } = KEYS;

const ProductCard: FC<Props> = ({
  id,
  image,
  price,
  categoryId,
  storeId,
  ...props
}) => {
  const locale = useLocale();

  const title = useMemo(
    () => (locale === LOCALE[0] ? props.titleAr : props.title),
    [locale, props.title, props.titleAr]
  );

  const description = useMemo(
    () => (locale === LOCALE[0] ? props.descriptionAr : props.description),
    [locale, props.description, props.descriptionAr]
  );

  return (
    <Link
      href={`/${locale}/stores/${storeId}/${categoryId}/${id}`}
      className="card card-compact w-64 bg-base-100 shadow-xl"
    >
      <figure>
        <Image
          src={`${BASE_URL}${image}`}
          alt={title}
          width={256}
          height={256}
          className="aspect-square object-cover"
          loading="lazy"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {title.substring(0, 20)}
          {title.length >= 20 ? "..." : ""}
        </h2>
        <p>{description}</p>
        <h2>{price} $</h2>
      </div>
    </Link>
  );
};

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  titleAr: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  descriptionAr: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  categoryId: PropTypes.string.isRequired,
  storeId: PropTypes.string.isRequired,
};

type Props = {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  price: number;
  categoryId: string;
  storeId: string;
};

export default memo(ProductCard);
