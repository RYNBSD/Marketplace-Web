import Image from "next/image";
import { getLocale } from "next-intl/server";
import Link from "next/link";

export default async function Profile({ user }: Props) {
  const locale = await getLocale();

  return (
    <section id="profile">
      <div className="flex flex-col items-center justify-center gap-3">
        <Image
          src={user.image}
          alt={user.username}
          width={128}
          height={128}
          loading="lazy"
          className="w-32 h-32 object-cover rounded-full"
        />
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            value={user.username}
            disabled
            className="grow"
            placeholder="Username"
          />
        </label>
        <Link
          href={`/${locale}/${user.id}/${
            user.seller === null ? "seller" : `dashboard/${user.seller.id}`
          }`}
          className="btn"
        >
          {user?.seller === null ? "Become a seller" : "Go to dashboard"}
        </Link>
      </div>
    </section>
  );
}

type Props = {
  user: null;
};
