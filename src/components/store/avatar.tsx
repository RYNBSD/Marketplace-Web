import { memo, type FC } from "react";
import PropTypes from "prop-types";
import { useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { KEYS } from "~/constant";

const { BASE_URL } = KEYS;

const StoreAvatar: FC<Props> = ({ id, name, image }) => {
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}/stores/${id}`}
      className="flex flex-col items-center justify-center gap-1"
    >
      <div className="avatar">
        <div className="w-24 rounded-full">
          <Image
            src={`${BASE_URL}${image}`}
            alt={name}
            width={96}
            height={96}
            loading="lazy"
            className="rounded-full"
          />
        </div>
      </div>
      <h3 className="text-lg font-semibold">{name}</h3>
    </Link>
  );
};

StoreAvatar.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

type Props = {
  id: string;
  name: string;
  image: string;
};

export default memo(StoreAvatar);
