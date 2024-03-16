import Link from "next/link";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { KEYS } from "~/constant";
import { fetchProfile } from "~/action/user";
import SignOut from "./sign-out";

const { BASE_URL } = KEYS;

export default async function NavbarProfile() {
  const locale = await getLocale();
  const t = await getTranslations("Navbar");
  const profile = await fetchProfile();

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <Image
            src={
              profile === null
                ? "/assets/images/blank-profile.webp"
                : `${BASE_URL}${profile.image}`
            }
            alt={profile === null ? "Blank picture" : profile.username}
            height={40}
            width={40}
            priority
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1000] p-2 shadow bg-base-100 rounded-box w-52"
      >
        {profile === null ? (
          <li>
            <Link href={`/${locale}/auth/sign-in`} className="justify-between">
              {t("sign-in")}
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link href={`/${locale}/profile`} className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/profile#settings`}
                className="justify-between"
              >
                Settings
              </Link>
            </li>
            <li>
              <SignOut />
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
