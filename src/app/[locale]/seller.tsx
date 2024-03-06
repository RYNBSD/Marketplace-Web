import type { FC } from "react";
import Image from "next/image";
import { memo } from "react";
import PropTypes from "prop-types";

const Seller: FC<Props> = ({ img, shopName }) => {
  return (
    <div>
      <Image
        className="rounded-full"
        alt={shopName}
        loading="lazy"
        width={50}
        height={50}
        src={img}
      />
      <h1>{shopName}</h1>
    </div>
  );
};

Seller.propTypes = {
  img: PropTypes.string.isRequired,
  shopName: PropTypes.string.isRequired,
};

export default memo(Seller);

type Props = {
  img: string;
  shopName: string;
};
