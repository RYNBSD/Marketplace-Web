"use client";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "~/context";

export default function NavbarProfile() {
  const { user, signOut } = useUser()!;
  const locale = useLocale();
  const t = useTranslations("Navbar");

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
              user === null ? "/assets/images/blank-profile.webp" : user.image
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
              <Link href={`/${locale}/${user.id}`} className="justify-between">
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
              <button type="button" onClick={() => signOut!()}>
                Sign out
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
