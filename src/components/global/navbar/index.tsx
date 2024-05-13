import Link from "next/link";
import Container from "../container";
import { getLocale } from "next-intl/server";
import NavbarCart from "./cart";
import NavbarProfile from "./profile";
import Image from "next/image";

export default async function Navbar() {
  const locale = await getLocale();

  return (
    <Container bg="bg-base-100">
      <nav className="navbar bg-base-100">
        <div className="flex-1">
          <Link href={`/${locale}`}>
            <div className="avatar">
              <div className="w-9 rounded">
                <Image
                  src="/assets/icons/512x512.png"
                  alt="logo"
                  width={36}
                  height={36}
                  loading="lazy"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </Link>
        </div>
        <div className="flex-none gap-2">
          <Link href={`/${locale}/search`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <NavbarCart />
          <NavbarProfile />
        </div>
      </nav>
    </Container>
  );
}
