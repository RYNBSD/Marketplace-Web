import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { DeleteBtn, Img, StoreBtn, Username } from "./profile-client";

export default async function Profile() {
  const [tInfo, locale] = await Promise.all([
    getTranslations("Profile.Info"),
    getLocale(),
  ]);

  return (
    <section
      className="flex flex-col justify-center items-center gap-3"
      id="profile"
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Img />
        <div className="flex flex-col items-center sm:items-start gap-3">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <Username />
          </label>
          <div className="flex gap-2">
            <Link
              className="btn btn-info capitalize"
              href={`/${locale}/profile/update`}
            >
              {tInfo("update")}
            </Link>
            <DeleteBtn />
          </div>
        </div>
      </div>
      <StoreBtn />
    </section>
  );
}
