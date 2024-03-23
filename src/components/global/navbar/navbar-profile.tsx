"use client";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { KEYS } from "~/constant";
import { useUser } from "~/context";

const { BASE_URL } = KEYS;

export default function NavbarProfile() {
  const locale = useLocale();
  const t = useTranslations("Navbar");
  const tProfile = useTranslations("Navbar.Profile");
  const { user, signOut } = useUser()!;

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
              user === null
                ? "/assets/images/blank-profile.webp"
                : `${BASE_URL}${user.image}`
            }
            alt={user === null ? "Blank picture" : user.username}
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
        {user === null ? (
          <li>
            <Link href={`/${locale}/auth/sign-in`} className="justify-between">
              {t("sign-in")}
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link href={`/${locale}/profile`} className="justify-between">
                {tProfile("profile")}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/profile#settings`}
                className="justify-between"
              >
                {tProfile("setting")}
              </Link>
            </li>
            <li>
              <button
                className="justify-between"
                type="button"
                onClick={signOut}
              >
                {tProfile("sign-out")}
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
